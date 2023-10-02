# Mindfully Project

## Implementation overview 

I used the out of the box nextjs starter to scaffold the project out.  Since the starter has typescript/tailwind support out of the box this made things relatively simple to get up and running.  I have a bit of experience with tailwind, so while I did spend a good chunk of time looking up css class names to use, I otherwise didn't need a full UI Framework to get things looking acceptable. I'm not a UX Designer so flexbox and basic colors got things laying out acceptably for me.

As far as libraries/dependencies, NextJS's batteries-included, opinionated approach makes it very appealing for this scale of project.  I didn't tweak the linting rules too much; I don't love some of the defaults but it wasn't worth completely upending the pull request diff.

For data fetching I used built in fetch. The PokeAPI REST Api was simple enough that it didn't seem worthwhile pulling in one of the API Wrappers. They also have a GraphQL API that is in beta but that also seemed like overkill for this project.  I did not implement a search functionality as the api [doesn't support it](https://github.com/PokeAPI/pokeapi/issues/383), and loading all the data on the client app seemed antithetical to the problem. If we were to implement search purely client side, I've used libraries like [fuse.js](https://fusejs.io/). Otherwise it'd make sense to consume the full set of pokemon into a true search index such as SOLR or Lucene to enable a more robust search experience powered by our own API.

## Time Spent

I spent a little under 3 hours on this. I think since I have extensive react experience and a bit of experience with next (albeit an older version) I was able to turn this around relatively quickly. I think if someone didn't have nextjs or react experience it'd be much tougher to turn around in the expected time frame.

If I were to spend more time on this the styling would be a major focus.  On the newer generations of pokemon, have longer names which causes the cards to be different widths which is not visually pleasing. 

I also opted not to write unit tests. If this were a system we were planning on maintaining, writing some basic component tests with something like `react-testing-library` would be a good idea (in addition to the pure data processing functions).

The README should include:
• A list of code copied in from sources such as Stack Overflow.
o You do not need to include dependencies from a dependency management, we can
check the package.json.

• How long was spent on the project? We want this to help calibrate our review and to adjust
this sample project for future candidates. If you feel you’re spending longer than the
expected 2-5 hours let us know.
• What are areas you chose to focus in to show off your strengths?
• What is a particular area you took a shortcut for time and what you might do differently in a
real production codebase?
• Anything else you wish to share, and think is worth knowing while the project is evaluated.
