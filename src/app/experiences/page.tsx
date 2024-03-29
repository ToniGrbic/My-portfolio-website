import styles from "@/styles/Experiences.module.scss";
import { CURRENT_YEAR } from "@/lib/constants";
import { client } from "@/lib/client";
import type { Experiences } from "@/types/schema-types";

async function getExperiences(): Promise<Experiences[]> {
  const query = '*[_type == "Experiences"] | order(_createdAt desc)';
  return await client.fetch<Experiences[]>(query);
}

const Page = async () => {
  const experiences = await getExperiences();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.year}>{CURRENT_YEAR}</h3>
      <div className={styles.timeline}>
        {experiences.map((experience, index) => {
          return (
            <div
              key={experience._id}
              className={`${index % 2 == 0 ? styles.left : styles.right}
               ${styles.container} `}
            >
              <div className={`${styles.content} app__modal-links`}>
                <h2>{experience.timePeriod}</h2>
                <p>
                  {experience.title} at {experience.department}
                </p>
                <p>
                  <a
                    target="_blank"
                    href={experience.website}
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <h3 className={styles.year}>2016</h3>
    </div>
  );
};

export default Page;
