const today = new Date().toDateString();

export const SYSTEM_PROMPT = (concept: string, data: any) => {
  switch (concept) {
    case 'Weather':
      return `
        CITY=${data.city}

        Present a clear, 45° top-down isometric miniature 3D cartoon scene of ${data.city}, featuring its most iconic landmarks and architectural elements. Use soft, refined textures with realistic PBR materials and gentle, lifelike lighting and shadows. Integrate the current weather for today's date: ${today} conditions directly into the city environment to create an immersive atmospheric mood.

        Use a clean, minimalistic composition with a soft, solid-colored background.

        At the top-center, place the title ${data.city} in large bold text, a prominent weather icon beneath it, then the date (small text; make sure it's today's date ${today}) and temperature (medium text).

        All text must be centered with consistent spacing, and may subtly overlap the tops of the buildings.

        Square 1080x1080 dimension.
      `;
    case 'Stadium':
      return `
        First, identify the home stadium for the football club: ${data.team}.

        Present a clear, 45° top-down isometric miniature 3D cartoon scene of that stadium, with soft refined textures, realistic PBR materials, and gentle lifelike lighting.

        For the background, use a clean solid color. If a color is provided (${data.color}), use that. Otherwise, use the primary color of the football club that owns the stadium.

        At the top-center, display the name of the stadium in large bold text, then directly beneath it show its real seating capacity in medium text, and place the official logo associated with the club/stadium below the capacity. All text must match the background contrast automatically (white or black). Centered layout, square 1080x1080 dimension.
      `;
    case 'Character':
        return `
        Generate a portrait image of a detailed, transparent glass sphere/capsule held between two fingers of an African against a neutral background. Inside the capsule is a miniature chibi version of ${data.characterName} with realistic facial features but cute proportions - oversized head, small body. The figure should be wearing their most iconic outfit or recognizable clothing. The glass should show realistic reflections and the figure should appear three-dimensional inside. Photorealistic style with perfect lighting. 1080x1080 dimension
      `;
    case 'Company':
        return `
        Present an exquisite, miniature 3D cartoon-style scene of the company corresponding to the user-specified company name or stock ticker, clearly viewed from a 45° top-down perspective.

        Place the company's most iconic building or campus prominently at the center, complemented by proportionally-sized icons of its key products, charming cartoon-style figures, vehicles, and other elements illustrating everyday company activities. The scene should be detailed, finely crafted, and playful.

        Rendered with Cinema 4D, the modeling should be refined, smoothly rounded, and rich in texture, accurately capturing realistic PBR materials. Gentle, lifelike lighting and soft shadows should create a warm, comfortable ambiance.

        Creatively integrate the company's real-time stock market data for the user-specified date (or automatically retrieved current date) into the scene, maintaining a clean, minimalist layout, and a solid-color background to highlight the primary content.

        At the top-center of the scene, prominently display the company name or stock ticker in a large font size, followed by the specified date in extra-small font, and the stock price range in a medium-sized font. Include clear, intuitive stock trend icons and charts.

        All texts should be displayed in the language specified or entered by the user, without any background, and may subtly overlap with the scene elements to enhance overall design integration.

        Very Important:
        Before generating, ensure accurate and up-to-date stock market data based on the user-inputted company name or stock ticker and the specified date. If such data is unavailable, notify the user immediately and stop the generation process.

        Parameters:

        * Aspect ratio: ${data.aspectRatio || '1:1'}
        * Date: ${data.date || today}
        * Company name or stock ticker: ${data.companyName}
      `;
    default:
      return `
        Please provide a valid concept.
      `;
  }
};
