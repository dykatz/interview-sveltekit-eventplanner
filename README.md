# **SvelteKit Events App** 📅

This is an event planning app built using **SvelteKit**. The user can see their current events and is able to add new ones.

The app currently supports server-side rendering (SSR) to fetch events data via the **Events Interface** defined under $lib/server/remote-events.ts, and route-based navigation for different events (e.g., `/eventid`).

## Dylan's Notes

- I opted to keep the TailwindCSS + DaisyUI combination, and I made better use of them throughout the application to give it a consistent design. I did not want to over think the design too much, and so kept everything in a narrow column in the center of the screen. I also used the browser's native inputs and date pickers. I know that using a component library can help me, especially with accessibility, but I am not familiar enough with Svelte's component library ecosystem.

- I made use of response streaming _everywhere_, which makes the app feel better at the expense of worse SEO. I am making the assumption that we are not going to need SEO that much. I do not know if it would ever be necessary for this application, but if it was, I would need to do some research into if it is possible for Svelte to use full SSR for a page on initial load while using response streaming when doing client-side navigation.

- I put the edit and delete actions for each event on their own pages, nested underneath the main event page. By doing this, I was able to get them to share fetching the event information with each other, which makes page navigation between them (after loading) instant.

- I avoided blocking various actions on waiting for responses. For example, on the event deletion page, the delete button renders before it knows if the event actually exists. This is not risky because in the event that the user clicks the button early, they are simply navigated back home anyways. Only the name of the event is blocked on the request. On the other pages where loading content is more necessary, I only displayed the back button while loading is in progress.

- When a user submits a form, I disable all inputs until it completes to avoid odd behavior. The loading indicator is that the text on the submit button changes conjugation and has "..." at the end. I could adjust this to make it animated or spinny, but I personally do not like those, and so I did not implement it.

- To ensure that the user cannot create an event in the past, I validate the date on both the frontend and the backend. The user will not be allowed to submit an invalid date. However, if there is no JS running (or the user submits a direct POST request with `curl(1)`) I also validate server side to avoid letting invalid data get inserted. If this happens, I present the user with an error page that lets them navigate back to the main flow of the application, but I would like to see if there is a way to preserve the state of the application so that the user can edit and re-submit.

- One thing I'd like to do (but I do not know if it is possible in SvelteKit) is make use of the results from the `fetchAllEvents()` to populate the results of pages that use `fetchEventById()`. This is possible with TanStack Query's `initialData` parameter. It would make the transition between a loaded home page and any of the event pages instantaneous. I also know that TSQ has its own state management that is separate from SvelteKit's, so I would prefer to just use what SK gives me wherever possible.

- I did not use exactly the same form/logic for both creating and editing events. I am adhering to the "do not repeat yourself _twice_" principle, because the logic only occurs twice in total, and the logic is different enough between them that trying to create a single API for both instances would be more involved than I'd like.

- I have added some tests. They are visible as unit tests for the helper functions I wrote under `lib/`, a component level test for `EditForm` (which is currently incomplete as I was having issues with the testing library and wanted to move on to handle other functionality), and an end-to-end test that covers creating, editing and deleting.

- Something missing from the current body of work is accessibility. I have not gone through all the elements and ensured that everything has proper `role` attributes and the correct aria labels. If implemented, this could also make writing the tests a lot easier. This is something that, as mentioned previously, could be helped with a component library, but I am not familiar enough with the Svelte ecosystem to risk using the wrong one.

## **Getting Started**

### **Recommended Editor and Extensions**

We recommend using **Visual Studio Code (VS Code)** for this project, as it provides excellent support for SvelteKit development via extensions.

1. **Install Visual Studio Code**  
   If you don't have VS Code installed, you can download it here:  
   [https://code.visualstudio.com/](https://code.visualstudio.com/)

2. **Recommended Extensions for VS Code**  
   This project includes recommended extensions in its workspace settings.

   - When you open the project in VS Code, you will be prompted to **"Install All"** recommended extensions.  
     Click **"Install All"** to quickly set up your environment.

   - Alternatively, you can find the recommended extensions by searching **`@recommended`** in the **Extensions pane** in VS Code.

### Running the project

To run this project locally, follow these steps:

1. **Install dependencies**:

   ```bash
   npm ci
   ```

1. Start the development server:

   ```bash
   npm run dev -- --open
   ```

1. This will open the project in your browser
   - You will be redirected to / by default.
   - You can now add new events by clicking the add event button

Exercise Goals

This project has some intentional gaps for you to address. Your task is to complete the following improvements and enhancements:

**Do not use AI tools on this project. You are expected to know and understand all the details of your implementation**

1. Enhancement: Sluggish user experience

   - Problem: The app is slow to load and navigate between routes.
   - Task: Optimize the app page load performance by utilizing SvelteKit's response streaming feature. Do not modify the remote-events.ts file and continue to use it as is.
   - Task: Optimize form submission by showing a loading indicator while the form is being submitted. Use Sveltekit's built-in Progressive enhancement feature for form to do this.

1. Enhancement: No way to edit or delete existing events

   - Problem: There is no way to edit or delete existing events.
   - Task: Add a way to edit existing events. You can use the same form for adding and editing events.
   - Task: Add a way to delete existing events.

1. Bug: User is able to submit a new event in the past

   - Problem: The user is able to submit a new event with a start date in the past.
   - Task: Prevent the user from submitting a new event with a start date in the past and show appropriate feedback to the user.

1. Enhancement: Basic Styles

   - Problem: There are no styles
   - Task: Improve the design of the UI, you may use any UI libraries you prefer or no libraries at all

1. Freestyle (Optional)

   - Task: Add any other features or improvements you like to show off your knowledge.
