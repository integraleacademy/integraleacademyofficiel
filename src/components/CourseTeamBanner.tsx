import Link from 'next/link';
import { TeamPortrait, type TeamMemberId } from './TeamPortrait';
import styles from './CourseTeamBanner.module.css';

const team: ReadonlyArray<{ person: TeamMemberId; name: string }> = [
  { person: 'cassandre', name: 'Cassandre' },
  { person: 'aurelie', name: 'Aurélie' },
  { person: 'clement', name: 'Clément' },
  { person: 'elsa', name: 'Elsa' },
  { person: 'yannice', name: 'Yannice' },
];

export function CourseTeamBanner() {
  return (
    <section className={styles.band} aria-labelledby="course-team-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="course-team-title">Une équipe <em>à vos côtés</em></h2>
          <Link href="/ecole#equipe">Rencontrer l’équipe <span aria-hidden="true">↗</span></Link>
        </div>
        <ul className={styles.people}>
          {team.map(({ person, name }) => (
            <li key={person}>
              <TeamPortrait person={person} size={112} sizes="(max-width: 660px) 14vw, 96px" className={styles.portrait} />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
