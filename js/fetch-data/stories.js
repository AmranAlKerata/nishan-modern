// let url = "https://demo2.bynishan.com/api/stories-en";
let url = "../../stories.json";
const storiesContainer = $(".stories-page .my-sizer-element");
const filterOptionsContainer = $(".filter-options");
const sectionContainer = $(".stories-gallery");
let storiesOnScreen = [];
let filterOptions = [];
const loader = `<div class="amk-loader"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`;

// Get all storeis tags and return them as one unique array
const uniqueTags = data => {
  // Get all tags and filter them in one array
  data.map(item => filterOptions.push(...(item.tags || [])));

  //  Remove Duplicated tags
  const filteredTags = Array.from(new Set(filterOptions));

  // Append Tags in filter options tabs
  filterOptionsContainer.append(
    filteredTags.map(
      tag =>
        `<a href="#${tag}" data-group="${tag}">${tag.replace("-", " ")}</a>`
    )
  );
};

// Create Stoies HTML MarkUp
const storyHTMLMarkUp = data => {
  // Loop over stories and create HTML Markup
  const stories = data.map(story => {
    let id = story.id || Math.random(),
      title = story.title || "Some other work",
      cover = story.cover || "https://placehold.co/600x400/EEE/31343C",
      tags = story.tags || [];

    // Create Shuffle Item
    const shuffleItem = document.createElement("div");
    shuffleItem.setAttribute("class", "col-12 col-lg-6 shuffle-item");
    shuffleItem.setAttribute("data-groups", `[${tags.map(el => `"${el}"`)}]`);

    // Create Project
    const project = document.createElement("div");
    project.setAttribute("class", "project");

    // Create Link
    const link = document.createElement("a");
    link.setAttribute("href", `/story/${id}`);

    // Create Title
    const projectName = document.createElement("div");
    projectName.setAttribute("class", "project-name");
    const h3 = document.createElement("h3");
    h3.textContent = title;

    // Arrow Icon
    const arrow = document.createElement("div");
    arrow.setAttribute("class", "arrow-icon");
    const nishanIcon = document.createElement("span");
    nishanIcon.setAttribute("class", "nishan-icon");
    nishanIcon.textContent = "w";

    // Create Project Cover
    const projectImg = document.createElement("img");
    projectImg.setAttribute("src", cover);
    projectImg.setAttribute("alt", title);
    projectImg.setAttribute("class", "project-img");

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

    let visibleStoriesCount = 4;
    let visibleStories = storyHTMLMarkUp(resp.data).splice(
      0,
      visibleStoriesCount
    );

    // Remove Loader
    $(".amk-loader").remove();

    // init shuffle js
    // init shuffle js
    const addNewStories = new ShuffleJS(
      document.getElementById("shuffle-js-container")
    );

    // Log events.
    addNewStories.addShuffleEventListeners();
    addNewStories._activeFilters = [];
    addNewStories.addFilterButtons();
    addNewStories.addSorting();
    addNewStories.addSearchFilter();
    addNewStories.onAppendBoxes(storyHTMLMarkUp(resp.data));

    // let isLoading = true;
    // const event = () => {
    //   if (
    //     window.scrollY >= $(".shuffle-item:last-child").offset().top - 100 &&
    //     isLoading
    //   ) {
    //     console.log("loading");
    //     isLoading = false;
    //     window.removeEventListener("scroll", event);
    //   }
    //   if (isLoading === false) {
    //     isLoading = true;
    //   }
    // };

    // window.addEventListener("scroll", event);
  } catch (error) {
    // Remove Loader
    $(".lds-roller").remove();
    // Append Error
    $(".amk-loader").append(
      "<div class='text-center'><h2>Error While Loading Stories...</h2><h3>Refresh the page or try again later</h3></div>"
    );
    throw new Error(error);
  }
};

fetchData();
