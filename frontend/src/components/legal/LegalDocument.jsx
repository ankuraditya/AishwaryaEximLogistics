const LegalDocument = ({
  sections = [],
}) => {
  return (
    <div className="ael-legal-document">
      {sections.map(
        (section) => (
          <section
            key={
              section.title
            }
          >
            <h2>
              {section.title}
            </h2>

            {section.paragraphs?.map(
              (
                paragraph,
                index
              ) => (
                <p
                  key={`${section.title}-p-${index}`}
                >
                  {paragraph}
                </p>
              )
            )}

            {section.bullets && (
              <ul>
                {section.bullets.map(
                  (bullet) => (
                    <li key={bullet}>
                      {bullet}
                    </li>
                  )
                )}
              </ul>
            )}
          </section>
        )
      )}
    </div>
  );
};

export default LegalDocument;