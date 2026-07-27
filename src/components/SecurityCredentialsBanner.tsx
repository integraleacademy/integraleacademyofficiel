const credentials = [
  { label: 'Certification', value: 'Qualiopi n°03169 du 21/10/2024' },
  { label: 'Titre enregistré', value: 'TFP APS · RNCP 36648' },
  { label: 'Agrément ADEF', value: '8320032701' },
  { label: 'Autorisation CNAPS', value: 'FOR-083-2027-02-08-20200755135' },
];

export function SecurityCredentialsBanner() {
  return (
    <aside aria-label="Certifications et agréments d’Intégrale Academy" className="border-b border-[#e5d9c4] border-t-[5px] border-t-[#17191d] bg-white px-4 py-4">
      <div className="page-container grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {credentials.map(({ label, value }) => (
          <div key={label} className="flex min-h-[58px] flex-col items-center justify-center rounded-[14px] bg-gradient-to-br from-[#f8f1e5] to-[#f3eadc] px-3 py-2 text-center text-[#111]">
            <p className="text-[0.62rem] font-black uppercase tracking-[.19em]">{label}</p>
            <p className="mt-1 text-[0.72rem] font-black leading-tight sm:text-[0.75rem]">{value}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
