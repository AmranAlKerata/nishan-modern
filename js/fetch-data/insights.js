let url = "https://demo2.bynishan.com/api/insights-en";
// let url = "../../data.json";
const storiesContainer = $(".insight-page .my-sizer-element");
const filterOptionsContainer = $(".filter-options");
const sectionContainer = $(".insights-gallery");
let storiesOnScreen = [];
let filterOptions = [];
const loader = `<div class="amk-loader"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`;

// Create Stoies HTML MarkUp
const storyHTMLMarkUp = (data) => {
  // Loop over stories and create HTML Markup
  const insights = data.map((insight) => {
    // Check for type of insight [Article || Note]

    if (insight.type === "article") {
      let id = insight.id || Math.random(),
        title = insight.title || "Some Fancy Words",
        image = insight.image || "https://placehold.co/600x400/EEE/31343C",
        tags = insight.tags || [];

      // Create Shuffle Item
      const shuffleItem = document.createElement("div");
      shuffleItem.className = "col-12 col-lg-6 shuffle-item";
      shuffleItem.setAttribute(
        "data-groups",
        `[${tags.map((el) => `"${el}"`)}]`
      );

      // Create Insight Card
      const insightCard = document.createElement("div");
      insightCard.className = "insight-card";

      // Create Link
      const link = document.createElement("a");
      link.href = `/insight/${id}`;

      // Create Insight Image
      const insightImg = document.createElement("img");
      insightImg.src = image;
      insightImg.alt = title;
      insightImg.className = "insight-img";
      insightImg.loading = "lazy";

      // Create Title
      const insightTitle = document.createElement("h4");
      insightTitle.className = "title";
      insightTitle.textContent = title;

      // Arrow Icon
      const nishanIcon = document.createElement("span");
      nishanIcon.className = "nishan-icon";
      nishanIcon.textContent = "w";

      //   Insight Tags
      const insightTag = document.createElement("h6");
      insightTag.className = "tag";
      insightTag.textContent = tags;

      // Append All Elements together
      insightTitle.appendChild(nishanIcon);
      link.appendChild(insightImg);
      link.appendChild(insightTitle);
      link.appendChild(insightTag);
      insightCard.appendChild(link);
      shuffleItem.appendChild(insightCard);
      return shuffleItem;
    }
    if (insight.type === "note") {
      let id = insight.id || Math.random(),
        background = insight.background || "#fff1b4";
      (description = insight.description || "Some Fancy Words"),
        (tags = insight.tags || []),
        (author = insight.author || "Someone Good");

      // Create Shuffle Item
      const shuffleItem = document.createElement("div");
      shuffleItem.className = "col-12 col-lg-6 shuffle-item";
      shuffleItem.id = `note-${id}`;
      shuffleItem.setAttribute(
        "data-groups",
        `[${tags.map((el) => `"${el}"`)}]`
      );

      // Create Insight Card
      const insightCard = document.createElement("div");
      insightCard.className = "insight-card note";
      insightCard.style.backgroundColor = background;

      // Create Link
      const link = document.createElement("a");
      link.href = `#note-${id}`;

      // Create Insight Image
      const insightDesc = document.createElement("p");
      insightDesc.textContent = description;
      insightDesc.className = "note-content";

      // Create Title
      const insightTitle = document.createElement("h4");
      insightTitle.className = "author fw-bold mt-3";
      insightTitle.textContent = author;

      // Create Copy Container
      const copyContainer = document.createElement("div");
      copyContainer.className = "copy-note text-end";

      // Arrow Icon
      const copy = document.createElement("img");
      copy.className = "copy-icon";
      copy.alt = "copy-icon";
      copy.src = "images/copy-outline.svg";

      // Append All Elements together
      copyContainer.appendChild(copy);
      link.appendChild(insightDesc);
      link.appendChild(insightTitle);
      link.appendChild(copyContainer);
      insightCard.appendChild(link);
      shuffleItem.appendChild(insightCard);
      return shuffleItem;
    }
  });
  return insights;
};

// Dynamic select 2 option for tags
const uniqueTags = (data) => {
  // Get all tags and filter them in one array
  data.map((item) => filterOptions.push(...(item.tags || [])));

  //  Remove Duplicated tags
  const filteredTags = Array.from(new Set(filterOptions));

  // Customize tags array for select 2
  const optionData = filteredTags.map((tag, i) => {
    return {
      id: i,
      text: tag
    };
  });

  // Append Options
  $("#insightSearchSelect").select2({
    data: optionData
  });
};

// Fetch Data from API
const fetchData = async () => {
  // Add Loader
  sectionContainer.append(loader);

  try {
    const data = await fetch(url);
    const resp = await data.json();

    // Append All tags in select box
    uniqueTags(resp.data);
    // Create HTML
    storyHTMLMarkUp(resp.data);

    // init shuffle js
    const addNewInsights = new ShuffleJS(
      document.getElementById("shuffle-js-container")
    );

    // Log events.
    addNewInsights.addShuffleEventListeners();
    addNewInsights._activeFilters = [];
    addNewInsights.addFilterButtons();
    addNewInsights.addSorting();
    addNewInsights.addSearchFilter();
    // Append Insights
    addNewInsights.onAppendBoxes(storyHTMLMarkUp(resp.data).slice(0, 4));

    // Start & End Index of how many items you want to show
    let start = 4;
    let end = 5;

    let isLoading = false;

    // Add Items & loading
    const addItems = () => {
      if (
        window.scrollY >= $(".shuffle-item:last-child").offset().top - 300 &&
        !isLoading
      ) {
        addNewInsights.onAppendBoxes(
          storyHTMLMarkUp(resp.data).slice(start, end)
        );

        start = end;
        end = end + 4; // chagne number to show more than 4 items for each loading
        isLoading = true;
        window.removeEventListener("scroll", addItems);
      }
    };

    // Remove Loading & stop adding items
    const stopAddItems = () => {
      if (
        window.scrollY < $(".shuffle-item:last-child").offset().top - 300 &&
        isLoading
      ) {
        isLoading = false;
        window.addEventListener("scroll", addItems);
      }
    };

    window.addEventListener("scroll", addItems);
    window.addEventListener("scroll", stopAddItems);

    // Remove Loader
    $(".amk-loader").remove();
  } catch (error) {
    // Remove Loader
    $(".lds-roller").remove();
    // Append Error
    $(".amk-loader").append(
      "<div class='text-center'><h2>Error While Loading Insights...</h2><h3>Refresh the page or try again later</h3></div>"
    );
    throw new Error(error);
  }
};

fetchData();
