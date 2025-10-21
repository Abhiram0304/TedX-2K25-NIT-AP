import TeamSection from "../../components/TeamSection";
import { teamData } from "../../data/team";

const syne = 'font-syne';

function AboutPage() {
  return (
    <section className="flex flex-col text-white px-4 sm:px-20 py-40 gap-20 min-h-screen items-center">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-around w-full">
        <h1
          className={`${syne} font-semibold text-[2.26rem] sm:text-[3.4rem]`}
        >
          OUR <span className="text-tedred">VISION</span>
        </h1>
        <div className="w-[90%] sm:w-[50%] text-neutral-400 text-lg">
          This year, we are excited to host a grand and well-organized TEDx
          event themed “Alchemy” featuring speakers from diverse domains such as
          Public Services, Entrepreneurship, Personal Transformation, NGOs,
          musicians, and other local talents. By focusing on local speakers, we
          aim to ensure that the community benefits from the insights shared,
          fostering meaningful interactions and discussions.
        </div>
      </div>

      <div className="flex flex-col items-center justify-around w-full">
        <TeamSection title="Core Team" teamMembers={teamData.Core} />
        <TeamSection title="Curation Team" teamMembers={teamData.Curation} />
        <TeamSection title="Web Dev Team" teamMembers={teamData.WebDev} />
        <TeamSection
          title="Graphic Design Team"
          teamMembers={teamData.SocialMeadiaAndDesign}
        />
        <TeamSection
          title="Sponsorship Team"
          teamMembers={teamData.Sponsorship}
        />
        <TeamSection
          title="Stage Operations Team"
          teamMembers={teamData.Stage}
        />
        <TeamSection
          title="Social Media and Videography Team"
          teamMembers={teamData.sm}
        />

        <TeamSection title="Event Management Team" teamMembers={teamData.em} />

      </div>
    </section>
  );
}

export default AboutPage;
