import Image, { type ImageProps } from 'next/image';
import aurelie from '../../public/images/team/aurelie.png';
import cassandre from '../../public/images/team/cassandre.png';
import clement from '../../public/images/team/clement.png';
import elsa from '../../public/images/team/elsa.png';
import yannice from '../../public/images/team/yannice.png';

const portraits = { aurelie, cassandre, clement, elsa, yannice };
export type TeamMemberId = keyof typeof portraits;

type TeamPortraitProps = Omit<ImageProps, 'src' | 'width' | 'height' | 'fill' | 'alt'> & {
  person: TeamMemberId;
  size: number;
  alt?: string;
};

/** Shared, cache-versioned portraits from the team's approved source images. */
export function TeamPortrait({ person, size, alt = '', sizes, style, ...props }: TeamPortraitProps) {
  return <Image
    {...props}
    src={portraits[person]}
    alt={alt}
    width={size}
    height={size}
    sizes={sizes ?? `${size}px`}
    style={{ objectFit: 'contain', borderRadius: '50%', backgroundColor: '#fff', ...style }}
  />;
}
