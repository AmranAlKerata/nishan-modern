const lang = $("html").attr("lang");
let url;
lang === "en"
  ? (url = "https://demo2.bynishan.com/api/stories-en")
  : (url = "https://demo2.bynishan.com/api/stories-ar");
const storiesContainer = $(".stories-page .my-sizer-element");
const filterOptionsContainer = $(".filter-options");
const sectionContainer = $(".stories-gallery");
let storiesOnScreen = [];
let filterOptions = [];

const loader = `<div class="amk-loader"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`;

// Get all storeis tags and return them as one unique array
const uniqueTags = (data) => {
  // Get all tags and filter them in one array
  data.map((item) => filterOptions.push(...(item.tags || [])));

  //  Remove Duplicated tags
  const filteredTags = Array.from(new Set(filterOptions));

  // Append Tags in filter options tabs
  filterOptionsContainer.append(
    filteredTags.map(
      (tag) =>
        `<a href="#${tag}" data-group="${tag}">${tag.replace("-", " ")}</a>`
    )
  );
};

// Create Stoies HTML MarkUp
const storyHTMLMarkUp = (data) => {
  // Loop over stories and create HTML Markup
  const stories = data.map((story) => {
    let id = story.id || Math.random(),
      title = story.title || "Some other work",
      cover = story.cover || "https://placehold.co/600x400/EEE/31343C",
      tags = story.tags || [];

    // Create Shuffle Item
    const shuffleItem = document.createElement("div");
    shuffleItem.className = "col-12 col-lg-6 shuffle-item";
    shuffleItem.setAttribute("data-groups", `[${tags.map((el) => `"${el}"`)}]`);

    // Create Project
    const project = document.createElement("div");
    project.className = "project";

    // Create Link
    const link = document.createElement("a");
    link.href = `/story/${id}`;

    // Create Title
    const projectName = document.createElement("div");
    projectName.className = "project-name";
    const h3 = document.createElement("h3");
    h3.textContent = title;

    // Arrow Icon
    const arrow = document.createElement("div");
    arrow.className = "arrow-icon";
    const nishanIcon = document.createElement("span");
    nishanIcon.className = "nishan-icon";
    nishanIcon.textContent = "w";

    // Create Project Cover
    const projectImg = document.createElement("img");
    projectImg.src = cover;
    projectImg.alt = title;
    projectImg.loading = "lazy";
    projectImg.className = "project-img";

    // Append All Elements together
    arrow.appendChild(nishanIcon);
    projectName.appendChild(h3);
    projectName.appendChild(arrow);
    link.appendChild(projectName);
    link.appendChild(projectImg);
    project.appendChild(link);
    shuffleItem.appendChild(project);

    return shuffleItem;
  });

  return stories;
};

// Fetch Data from API
const fetchData = async () => {
  // Add Loader
  sectionContainer.append(loader);

  try {
    const data = await fetch(url);
    const resp = await data.json();

    // Show Tags in UI
    uniqueTags(resp.data);

    // Create HTML
    storyHTMLMarkUp(resp.data);

    // Remove Loader
    $(".amk-loader").remove();

    // init shuffle js
    const addNewStories = new ShuffleJS(
      document.getElementById("shuffle-js-container")
    );

    // Log events.
    addNewStories.addShuffleEventListeners();
    addNewStories.addFilterButtons();
    // Append Stories
    addNewStories.onAppendBoxes(storyHTMLMarkUp(resp.data).slice(0, 4));
    addNewStories.allItems = storyHTMLMarkUp(resp.data).slice(
      4,
      resp.data.length
    );

    // Start & End Index of how many items you want to show
    let start = 4;
    let end = 5;

    let isLoading = false;

    // Add Items & loading
    const addItems = () => {
      if (
        window.scrollY >= $(".shuffle-item:last-child").offset().top - 300 &&
        !isLoading &&
        !addNewStories.allItemsVisible
      ) {
        addNewStories.onAppendBoxes(
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
  } catch (error) {
    // Remove Loader
    $(".lds-roller").remove();
    // Append Error
    $(".amk-loader").append(
      `<div class='text-center'><h2>${lang === "en"
        ? "Error While Loading Stories..."
        : "حدث خطأ أثناء تحميل المشاريع..."}</h2><h3>${lang === "en"
        ? "Refresh the page or try again later"
        : "قم بتحديث الصفحة أو حاول مجدداً في وقت لاحق"}</h3></div>`
    );
    throw new Error(error);
  }
};

fetchData();
