const syne = 'font-syne';

const TeamSection = ({ title, teamMembers }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-around w-full my-8">
      <h1
        className={`${syne} font-semibold self-start mb-4 text-[2.26rem] sm:text-[3rem] text-start w-full sm:w-1/4 pl-5 pt-5 sm:pl-0`}
      >
        {title}
      </h1>
      <div className="w-full sm:w-[50%] grid justify-center grid-cols-2 gap-12 py-2 md:grid-cols-3">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col  justify-center items-center h-50 w-50 mx-auto"
          >
            <img
              src={member.pic}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover filter grayscale"
              width={128}
              height={128}
            />
            <p
              className={`mt-4 ${title === "Core Team" ? "text-tedred" : "text-white"}`}
            >
              {member.name}
            </p>
            <p className="text-center">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
