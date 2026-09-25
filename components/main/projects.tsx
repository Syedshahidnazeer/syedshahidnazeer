import { ProjectCard } from "@/components/sub/project-card";
import styles from "@/components/sub/project-card.module.css";
import { PROJECTS } from "@/constants";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-6 md:py-10 px-4 sm:px-6 lg:px-10"
    >
      <h2 className="text-[30px] sm:text-[36px] lg:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 pb-8 md:pb-12 text-center">
        My Projects
      </h2>

      <div className={styles.cardList}>
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            category={project.category}
            tech={project.tech}
            description={project.description}
            accent={project.accent}
            link={project.link}
          />
        ))}
      </div>

      {/*
        Shared bump-map filter for the ticket cards' holographic foil
        texture (Uiverse.io by dexter-st). Defined once here — every
        <ProjectCard> references the same #ticket-bump id — rather than
        duplicating an identical <filter> per card.
      */}
      <svg aria-hidden style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="ticket-bump">
          <feTurbulence
            result="noise"
            numOctaves={3}
            baseFrequency={0.7}
            type="fractalNoise"
          />
          <feSpecularLighting
            in="noise"
            result="specular"
            lightingColor="#fffffc"
            specularExponent={25}
            specularConstant={0.8}
            surfaceScale={0.15}
          >
            <fePointLight z={210} y={100} x={100} />
          </feSpecularLighting>
          <feComposite
            result="noise2"
            operator="in"
            in="specular"
            in2="SourceGraphic"
          />
          <feBlend mode="screen" in2="noise2" in="SourceGraphic" />
        </filter>
      </svg>
    </section>
  );
};
