import Link from 'next/link';
import { TeamPortrait, type TeamMemberId } from './TeamPortrait';
import styles from './CourseTeamBanner.module.css';

const team: ReadonlyArray<{ person: TeamMemberId; name: string; role: string }> = [
  { person: 'clement', name: 'Clément', role: 'Directeur général' },
  { person: 'elsa', name: 'Elsa', role: 'Assistante de direction' },
  { person: 'cassandre', name: 'Cassandra', role: 'Responsable commerciale' },
  { person: 'aurelie', name: 'Aurélie', role: 'Responsable BTS et relations clients' },
  { person: 'yannice', name: 'Yanis', role: 'Coordinateur pédagogique' },
];

export function CourseTeamBanner() {
  return (
    <section className={styles.band} aria-labelledby="course-team-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="course-team-title">Une équipe <em>à vos côtés</em></h2>
          <Link href="/ecole#equipe">
            Rencontrer l’équipe
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12l8-8M4 4h8v8" />
            </svg>
          </Link>
        </div>
        <ul className={styles.people}>
          {team.map(({ person, name, role }) => (
            <li key={person}>
              <Link className={styles.profile} href={`/ecole#equipe-${person}`}>
                <TeamPortrait person={person} size={112} sizes="(max-width: 520px) 18vw, 96px" className={styles.portrait} />
                <strong className={styles.name}>{name}</strong>
                <span className={styles.role}>{role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
