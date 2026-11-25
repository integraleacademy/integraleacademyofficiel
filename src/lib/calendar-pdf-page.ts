import {
  PDFPage, PDFFont, PDFImage, PageSizes, rgb, pushGraphicsState, popGraphicsState, setFillingRgbColor,
  moveTo, lineTo, appendBezierCurve, closePath, clip, endPath, fill,
} from 'pdf-lib';

export const [WIDTH, HEIGHT] = PageSizes.A4;
export const MARGIN = 32;
export const CONTENT = WIDTH - MARGIN * 2;
export const palette = {
  ink: '#10223B', navy: '#101F36', muted: '#475B6F', light: '#DCE5EF', gold: '#EDBA5A',
  line: '#DCE3E8', paper: '#FFFFFF', cream: '#FBF5E9', pale: '#F1F5F7', quiet: '#718090',
};
export type PdfFonts = { body: PDFFont; bold: PDFFont };
export type Face = keyof PdfFonts;

function color(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return rgb((value >> 16) / 255, (value >> 8 & 255) / 255, (value & 255) / 255);
}

function printable(value: string) {
  return String(value).normalize('NFC').replace(/[\u00a0\u202f\t]/g, ' ').replace(/[^\u0020-\u017f\u2000-\u203a€]/g, '');
}

function roundedPath(x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  const k = r * .552285, right = x + width, top = y + height;
  return [
    moveTo(x + r, top), lineTo(right - r, top), appendBezierCurve(right - r + k, top, right, top - r + k, right, top - r),
    lineTo(right, y + r), appendBezierCurve(right, y + r - k, right - r + k, y, right - r, y),
    lineTo(x + r, y), appendBezierCurve(x + r - k, y, x, y + r - k, x, y + r),
    lineTo(x, top - r), appendBezierCurve(x, top - r + k, x + r - k, top, x + r, top), closePath(),
  ];
}

/** Top-left coordinates in A4 points, shared by the agenda and the month grids. */
export class CalendarPage {
  constructor(readonly page: PDFPage, readonly fonts: PdfFonts) {}

  measure(value: string, size: number, face: Face = 'body') {
    return this.fonts[face].widthOfTextAtSize(printable(value), size);
  }

  words(value: string, maxWidth: number, size: number, face: Face = 'body'): string[] {
    const rows: string[] = [];
    for (const paragraph of value.split(/\r?\n/)) {
      let row = '';
      for (const word of printable(paragraph).split(/\s+/).filter(Boolean)) {
        const next = row ? row + ' ' + word : word;
        if (row && this.measure(next, size, face) > maxWidth) { rows.push(row); row = ''; }
        if (this.measure(word, size, face) > maxWidth) {
          for (const letter of word) {
            if (row && this.measure(row + letter, size, face) > maxWidth) { rows.push(row); row = ''; }
            row += letter;
          }
        } else row = row ? row + ' ' + word : word;
      }
      if (row) rows.push(row);
    }
    return rows;
  }

  text(value: string, x: number, top: number, size: number, face: Face = 'body', hex = palette.ink) {
    this.page.drawText(printable(value), { x, y: HEIGHT - top - size, size, font: this.fonts[face], color: color(hex) });
  }

  centered(value: string, cx: number, top: number, size: number, face: Face = 'body', hex = palette.ink) {
    this.text(value, cx - this.measure(value, size, face) / 2, top, size, face, hex);
  }

  right(value: string, edge: number, top: number, size: number, face: Face = 'body', hex = palette.ink) {
    this.text(value, edge - this.measure(value, size, face), top, size, face, hex);
  }

  box(x: number, top: number, width: number, height: number, hex: string, radius = 0) {
    const paint = color(hex);
    if (!radius) {
      this.page.drawRectangle({ x, y: HEIGHT - top - height, width, height, color: paint });
      return;
    }
    this.page.pushOperators(pushGraphicsState(), setFillingRgbColor(paint.red, paint.green, paint.blue),
      ...roundedPath(x, HEIGHT - top - height, width, height, radius), fill(), popGraphicsState());
  }

  dot(x: number, top: number, radius: number, hex: string) {
    this.page.drawCircle({ x, y: HEIGHT - top, size: radius, color: color(hex) });
  }

  image(image: PDFImage, x: number, top: number, width: number, height: number, radius = 0) {
    this.page.pushOperators(pushGraphicsState());
    if (radius) this.page.pushOperators(...roundedPath(x, HEIGHT - top - height, width, height, radius), clip(), endPath());
    this.page.drawImage(image, { x, y: HEIGHT - top - height, width, height });
    this.page.pushOperators(popGraphicsState());
  }
}
