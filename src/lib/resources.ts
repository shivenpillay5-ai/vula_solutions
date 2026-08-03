export type ResourceContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type ResourceArticle = {
  slug: string;
  tag: "Guide" | "Checklist" | "Playbook" | "Insight" | "Leadership" | "Strategy" | "Discovery" | "Change";
  title: string;
  description: string;
  body?: ResourceContentBlock[];
};

export type ResourceSection = {
  slug: string;
  title: string;
  description: string;
  articles: ResourceArticle[];
};

export const resourceSections: ResourceSection[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description:
      "Foundational reading for leaders who want clarity before committing to change.",
    articles: [
      {
        slug: "why-most-software-projects-fail-before-they-begin",
        tag: "Discovery",
        title: "Why Most Software Projects Fail Before They Begin",
        description:
          "Why clarity should come before software decisions.",
        body: [
          {
            type: "paragraph",
            text:
              "When people think about a software project going wrong, they usually imagine missed deadlines, budgets spiralling out of control, or a system that simply does not work.",
          },
          {
            type: "paragraph",
            text:
              "The reality is that most projects do not fail because of poor technology. They fail long before a developer writes the first line of code.",
          },
          {
            type: "paragraph",
            text:
              "After working in technology for many years, we have seen the same pattern appear again and again. Businesses often rush to find a solution before they have fully understood the problem they are trying to solve.",
          },
          {
            type: "paragraph",
            text:
              "It is completely understandable. When a business is growing, there is pressure to move quickly. Teams are frustrated with manual processes, customers are asking for improvements, and someone inevitably says, \"We need new software.\"",
          },
          {
            type: "paragraph",
            text:
              "The trouble is that software is not the starting point. Understanding the business is.",
          },
          { type: "heading", text: "The excitement of finding a solution" },
          {
            type: "paragraph",
            text:
              "It is easy to get excited when you see software that promises to solve all your problems. The demonstrations look impressive. The sales team makes it sound simple. You can almost picture your business running more smoothly.",
          },
          {
            type: "paragraph",
            text:
              "But there is one important question that often gets overlooked: what problem are we actually trying to solve?",
          },
          {
            type: "paragraph",
            text:
              "That sounds obvious, but it is surprising how many organisations cannot answer it clearly. Instead of defining the business challenge, they start comparing software features. One system has dashboards. Another has automation. Another offers artificial intelligence. Soon the conversation becomes about products instead of outcomes.",
          },
          { type: "heading", text: "Technology cannot fix an unclear business process" },
          {
            type: "paragraph",
            text:
              "Imagine paving a road that already has the wrong route. You will end up with a smoother journey to the wrong destination.",
          },
          {
            type: "paragraph",
            text:
              "Technology works in much the same way. If the existing process is unclear, inconsistent or inefficient, software usually makes those problems happen faster. Instead of improving the business, it simply automates confusion.",
          },
          {
            type: "paragraph",
            text:
              "We have seen organisations spend months implementing systems, only to discover that every department had a different understanding of how the process should work. The software was not the problem. The business process was.",
          },
          { type: "heading", text: "Everyone has a different picture" },
          {
            type: "paragraph",
            text:
              "One of the biggest risks in any project is assuming everyone is talking about the same thing. Ask five people how an order moves through the business and you might receive five different answers. Sales sees it one way. Operations sees it another. Finance has its own requirements. Management has different expectations again.",
          },
          {
            type: "paragraph",
            text:
              "If those differences are not discovered early, they eventually become expensive software changes. That is why the first job is not gathering technical requirements. It is building a shared understanding of how the business actually operates today and where it wants to be tomorrow.",
          },
          { type: "heading", text: "The hidden cost of assumptions" },
          {
            type: "paragraph",
            text:
              "Assumptions are one of the most expensive parts of any software project. People assume everyone understands the process. They assume certain steps are obvious. They assume customers behave in a particular way.",
          },
          {
            type: "paragraph",
            text:
              "Unfortunately, software is very literal. It only does exactly what it is told. If the wrong assumptions are built into the system, fixing them later usually costs far more than identifying them at the beginning. A few days spent asking better questions can save months of rework later.",
          },
          { type: "heading", text: "Software should support the business" },
          {
            type: "paragraph",
            text:
              "Too often, businesses change the way they work simply to fit a piece of software. Sometimes that is appropriate. Many processes can and should be simplified.",
          },
          {
            type: "paragraph",
            text:
              "But sometimes valuable ways of working disappear because nobody stopped to ask why they existed in the first place. Good technology should support good business decisions. It should not force a business to lose what makes it successful.",
          },
          {
            type: "paragraph",
            text:
              "That is why understanding people, processes and goals matters just as much as understanding technology.",
          },
          { type: "heading", text: "Success starts with clarity" },
          {
            type: "paragraph",
            text:
              "The most successful projects we have been involved in all shared something in common. Everyone understood:",
          },
          {
            type: "list",
            items: [
              "what problem they were solving",
              "why it mattered",
              "who it affected",
              "how success would be measured",
              "what the future should look like",
            ],
          },
          {
            type: "paragraph",
            text:
              "Notice that none of those involve choosing software. That is deliberate. Technology comes later. Clarity comes first.",
          },
          { type: "heading", text: "The value of asking better questions" },
          {
            type: "paragraph",
            text:
              "Sometimes businesses worry that spending time understanding the problem will delay the project. In reality, it usually speeds everything up.",
          },
          {
            type: "paragraph",
            text: "When everyone shares the same understanding:",
          },
          {
            type: "list",
            items: [
              "decisions become easier",
              "priorities become clearer",
              "suppliers receive better information",
              "budgets become more realistic",
              "risks are identified much earlier",
            ],
          },
          {
            type: "paragraph",
            text:
              "Instead of constantly changing direction, the project moves forward with confidence.",
          },
          { type: "heading", text: "Before you buy software..." },
          {
            type: "paragraph",
            text:
              "If you are considering new software, pause for a moment before comparing products. Ask yourself:",
          },
          {
            type: "list",
            items: [
              "Do we fully understand the problem?",
              "Have we agreed what success looks like?",
              "Do all departments see the process in the same way?",
              "Are we fixing the right issue?",
              "Have we challenged our assumptions?",
            ],
          },
          {
            type: "paragraph",
            text:
              "If the answer to any of those questions is \"I am not sure\", that is not a reason to stop. It is a reason to spend a little more time discovering the business before choosing the technology.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Software is one of the most powerful tools a business can invest in. When it is built on clear business understanding, it can transform the way an organisation works. But when that understanding is missing, even the best software will struggle to deliver the results everyone hoped for.",
          },
          {
            type: "paragraph",
            text:
              "That is why we at VULA believe every successful project starts in the same place. Not with software. Not with technology. With curiosity.",
          },
          {
            type: "paragraph",
            text:
              "Because the best solutions do not begin with the question, \"What system should we buy?\" They begin with a much simpler one: \"What problem are we really trying to solve?\"",
          },
        ],
      },
      {
        slug: "five-questions-before-buying-software",
        tag: "Discovery",
        title: "The Five Questions Every Business Should Answer Before Buying Software",
        description:
          "Five questions to answer before choosing software.",
        body: [
          {
            type: "paragraph",
            text:
              "Buying new software is a big decision.",
          },
          {
            type: "paragraph",
            text:
              "Whether you are looking for a CRM, an accounting package, a booking system or a completely bespoke solution, it is easy to become focused on features, pricing and demonstrations.",
          },
          {
            type: "paragraph",
            text:
              "The software looks impressive. The sales presentation makes perfect sense. Before long, you are comparing one product against another and wondering which one offers the most value.",
          },
          {
            type: "paragraph",
            text:
              "But there is a problem. If you have not answered a few important business questions first, even the best software can end up being the wrong choice.",
          },
          {
            type: "paragraph",
            text:
              "Over the years, we have found that the businesses who get the best results are not necessarily the ones with the biggest budgets or the newest technology. They are the ones who take the time to understand their business before they invest in software.",
          },
          {
            type: "paragraph",
            text:
              "Here are five questions every business should answer before making that decision.",
          },
          { type: "heading", text: "1. What problem are we actually trying to solve?" },
          {
            type: "paragraph",
            text:
              "This might sound like an obvious question, but it is often the one that gets skipped.",
          },
          {
            type: "paragraph",
            text:
              "Sometimes businesses decide they need new software simply because their current system feels old or because a competitor has implemented something new. Neither of those is a good enough reason.",
          },
          {
            type: "paragraph",
            text:
              "Instead, ask yourself:",
          },
          {
            type: "list",
            items: [
              "What is not working today?",
              "What is causing frustration?",
              "Where are we losing time or money?",
              "What would improve if this problem disappeared?",
            ],
          },
          {
            type: "paragraph",
            text:
              "Be as specific as you can. 'The system is slow' is a symptom. 'Our sales team spends two hours every day entering the same information twice' is a problem you can solve. The clearer the problem, the easier it becomes to find the right solution.",
          },
          { type: "heading", text: "2. What does success actually look like?" },
          {
            type: "paragraph",
            text:
              "Many projects finish on time and within budget but still leave everyone feeling disappointed. Why? Because nobody agreed what success looked like at the beginning.",
          },
          {
            type: "paragraph",
            text:
              "Before looking at software, decide what you are hoping to achieve. For example:",
          },
          {
            type: "list",
            items: [
              "Reduce manual administration.",
              "Improve customer response times.",
              "Give management better reporting.",
              "Eliminate duplicate data entry.",
              "Increase productivity without increasing headcount.",
            ],
          },
          {
            type: "paragraph",
            text:
              "These are not software features. They are business outcomes. And that is what really matters.",
          },
          { type: "heading", text: "3. Are we solving a process problem or a software problem?" },
          {
            type: "paragraph",
            text:
              "This is one of the biggest mistakes we see. Businesses often assume technology is the answer when the real issue is the way work is being done.",
          },
          {
            type: "paragraph",
            text:
              "Imagine a process that requires five unnecessary approvals. Replacing the software will not suddenly make that process efficient. It simply means those five approvals happen in a different system.",
          },
          {
            type: "paragraph",
            text:
              "Before investing in technology, take a step back and ask: 'Would this process still make sense if we were designing it today?' If the answer is no, improve the process first. Then find software that supports it.",
          },
          { type: "heading", text: "4. Who needs to be involved?" },
          {
            type: "paragraph",
            text:
              "Software affects people, and people experience the business in different ways. Managers need visibility. Front-line staff need efficiency. Finance needs accuracy. Customers want simplicity.",
          },
          {
            type: "paragraph",
            text:
              "If only one department chooses the software, there is a good chance important perspectives will be missed. That is why business discovery should involve the people who actually use the process every day.",
          },
          {
            type: "paragraph",
            text:
              "They often identify challenges and opportunities that are not visible in management meetings. When everyone contributes early, adoption becomes much easier later. People are far more likely to support a solution they have helped shape.",
          },
          { type: "heading", text: "5. Are we choosing software for today or for where we are going?" },
          {
            type: "paragraph",
            text:
              "Businesses grow. Processes change. Customer expectations evolve. The software you choose today should support your business not only now, but over the next few years as well.",
          },
          {
            type: "paragraph",
            text:
              "That does not mean buying the biggest or most expensive platform. It means choosing something that aligns with your future direction. Ask questions like:",
          },
          {
            type: "list",
            items: [
              "Will this support our growth?",
              "Can it adapt as our business changes?",
              "Does it integrate with the tools we already use?",
              "Will it become a limitation in two or three years?",
            ],
          },
          {
            type: "paragraph",
            text:
              "Thinking ahead can save a great deal of time and expense later.",
          },
          { type: "heading", text: "Do not let the software demonstration make the decision" },
          {
            type: "paragraph",
            text:
              "Software demonstrations are designed to show products at their best. There is nothing wrong with that. But it is easy to become distracted by polished dashboards, automation and impressive features.",
          },
          {
            type: "paragraph",
            text:
              "The real question is not whether the software is good. It is whether it is right for your business. Those are two very different things.",
          },
          {
            type: "paragraph",
            text:
              "A product with hundreds of features is not automatically a better fit than one with twenty. If those twenty features solve your biggest challenges, you have probably found the better solution.",
          },
          { type: "heading", text: "Good decisions start with understanding" },
          {
            type: "paragraph",
            text:
              "One thing we have learned throughout our careers is that technology decisions become much easier once the business is properly understood.",
          },
          {
            type: "paragraph",
            text:
              "The conversations change. Instead of asking, 'Which software should we buy?' you start asking, 'Which solution best supports the way we want our business to operate?' That is a far better question because it puts the business first and the technology second.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Software is an investment. Like any investment, the quality of the outcome depends on the quality of the decisions that came before it.",
          },
          {
            type: "paragraph",
            text:
              "Taking the time to answer these five questions will not slow your project down. In fact, it usually saves time, reduces risk and helps you make decisions with greater confidence.",
          },
          {
            type: "paragraph",
            text:
              "Technology is incredibly powerful, but it is at its best when it is supporting a clear business vision. That is why we always encourage businesses to pause before comparing products. Spend time understanding the business first. The right software decision will usually become much clearer afterwards.",
          },
          { type: "heading", text: "Need a second opinion?" },
          {
            type: "paragraph",
            text:
              "If you are considering new software but are not sure where to begin, start with understanding the business rather than the technology. That is exactly what Compass™ is designed to do: help you gain clarity before making important decisions, so you can invest with confidence.",
          },
        ],
      },
      {
        slug: "why-requirements-gathering-isnt-business-discovery",
        tag: "Discovery",
        title: "Why Requirements Gathering Isn't Business Discovery",
        description:
          "Why business discovery should come before requirements.",
        body: [
          {
            type: "paragraph",
            text:
              "When businesses start planning a new software project, one phrase comes up almost immediately: 'We need to gather the requirements.'",
          },
          {
            type: "paragraph",
            text:
              "On the surface, that makes perfect sense. You need to know what the software should do before anyone can build it.",
          },
          {
            type: "paragraph",
            text:
              "The problem is that many organisations treat requirements gathering as the very first step. In reality, it should not be. Before you can define what a system needs to do, you first need to understand the business it is being built for. That is where business discovery comes in.",
          },
          {
            type: "paragraph",
            text:
              "Although the two terms are often used interchangeably, they are not the same thing. Understanding the difference can be the reason a project succeeds or struggles.",
          },
          { type: "heading", text: "What is requirements gathering?" },
          {
            type: "paragraph",
            text:
              "Requirements gathering focuses on the solution. It is the process of identifying what the software should do.",
          },
          {
            type: "paragraph",
            text:
              "Questions might include:",
          },
          {
            type: "list",
            items: [
              "Should customers be able to book online?",
              "What reports are needed?",
              "Which fields should appear on a form?",
              "Who should approve an invoice?",
              "What integrations are required?",
            ],
          },
          {
            type: "paragraph",
            text:
              "These are all important questions. They help define the functionality of the system. But there is something they do not answer: why? Why does the business need these features? Why does the process work this way? Why is this problem worth solving? Without those answers, requirements become little more than a wish list.",
          },
          { type: "heading", text: "What is business discovery?" },
          {
            type: "paragraph",
            text:
              "Business discovery happens before anyone starts talking about software. Its purpose is to understand the business as a whole.",
          },
          {
            type: "paragraph",
            text:
              "It looks beyond systems and asks questions like:",
          },
          {
            type: "list",
            items: [
              "What are we trying to achieve?",
              "How does the business operate today?",
              "Where are the frustrations?",
              "What causes delays?",
              "Which processes add value?",
              "Which ones do not?",
              "What does success look like?",
            ],
          },
          {
            type: "paragraph",
            text:
              "Notice that none of those questions mention technology. That is intentional. Business discovery is about understanding the business before deciding how technology can support it.",
          },
          { type: "heading", text: "The danger of jumping straight to requirements" },
          {
            type: "paragraph",
            text:
              "Imagine someone tells an architect they need ten extra rooms in their house. A good architect probably would not start drawing plans immediately. They would ask questions. How many people live there? How do you use the space? Why do you need more rooms? What is working well today? What is frustrating you? Only after understanding the bigger picture would they begin designing the solution.",
          },
          {
            type: "paragraph",
            text:
              "Software projects should work exactly the same way. If you start with requirements alone, you risk building a solution around assumptions rather than facts.",
          },
          { type: "heading", text: "People often describe the solution instead of the problem" },
          {
            type: "paragraph",
            text:
              "One thing we have noticed throughout our careers is that people are usually very good at explaining what they want. They are not always sure why they want it.",
          },
          {
            type: "paragraph",
            text:
              "Someone might say, 'We need another approval step.' Or, 'We need a dashboard.' Or, 'We need AI.' Those requests might be valid, but they might also be attempts to work around a deeper business issue.",
          },
          {
            type: "paragraph",
            text:
              "If we never explore the reason behind the request, we may end up solving the wrong problem. Sometimes the best solution is not another feature. Sometimes it is removing unnecessary complexity altogether.",
          },
          { type: "heading", text: "Discovery creates shared understanding" },
          {
            type: "paragraph",
            text:
              "Every department sees the business differently. Sales focuses on customers. Operations focuses on delivery. Finance focuses on accuracy. Management focuses on performance. Each perspective is valuable.",
          },
          {
            type: "paragraph",
            text:
              "Business discovery brings those perspectives together. Instead of everyone working from different assumptions, the organisation develops a shared understanding of how the business works today and where it wants to go.",
          },
          {
            type: "paragraph",
            text:
              "Only then does it make sense to define software requirements.",
          },
          { type: "heading", text: "Requirements answer 'what'. Discovery answers 'why'." },
          {
            type: "paragraph",
            text:
              "A simple way to remember the difference is this: business discovery asks why does this process exist, why is it done this way, why is it causing problems and why does it matter. Requirements gathering asks what should the software do, what information is needed, what screens should exist and what reports should be available.",
          },
          {
            type: "paragraph",
            text:
              "Both are essential, but they happen in a different order. When you understand the why, defining the what becomes much easier.",
          },
          { type: "heading", text: "Better discovery leads to better decisions" },
          {
            type: "paragraph",
            text:
              "One of the biggest benefits of business discovery is clarity. It helps businesses identify unnecessary processes, uncover hidden risks, align different teams, prioritise improvements and make more confident technology decisions.",
          },
          {
            type: "paragraph",
            text:
              "It also reduces one of the biggest causes of project delays: changing your mind halfway through. When everyone understands the business from the beginning, there are far fewer surprises later.",
          },
          { type: "heading", text: "Technology should support the business" },
          {
            type: "paragraph",
            text:
              "It is easy to assume that software is the centre of a transformation project. In reality, it is only one part of it. People. Processes. Customers. Goals. Culture. These all shape whether a project succeeds. Technology simply enables them.",
          },
          {
            type: "paragraph",
            text:
              "That is why the strongest software projects do not begin with system specifications. They begin with conversations.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Requirements gathering is important. No successful software project can happen without it. But it is only part of the journey.",
          },
          {
            type: "paragraph",
            text:
              "If requirements gathering tells you what to build, business discovery tells you why you are building it in the first place. When businesses take the time to understand themselves before choosing technology, better decisions naturally follow.",
          },
          {
            type: "paragraph",
            text:
              "Projects become clearer. Risks become easier to manage. And software becomes a tool that supports the business, rather than one the business has to work around.",
          },
          {
            type: "paragraph",
            text:
              "That is why we believe every successful transformation starts with discovery. Not because it is another phase in a project, but because understanding always comes before building.",
          },
          { type: "heading", text: "Ready to start with clarity?" },
          {
            type: "paragraph",
            text:
              "At VULA, every client engagement begins with Compass™. Before recommending software, processes or automation, we take the time to understand your business, your goals and the challenges you are trying to solve. Because the best technology decisions are built on a clear understanding of the business behind them.",
          },
        ],
      },
    ],
  },
  {
    slug: "strategy-and-leadership",
    title: "Strategy and Leadership",
    description:
      "Leadership thinking for clearer direction, stronger buy-in and better decisions.",
    articles: [
      {
        slug: "why-transformation-fails-without-leadership-buy-in",
        tag: "Leadership",
        title: "Why Transformation Fails Without Leadership Buy-In",
        description:
          "Why transformation succeeds only with visible leadership buy-in.",
        body: [
          {
            type: "paragraph",
            text:
              "When transformation conversations begin, the focus often lands on systems, platforms and delivery plans. Yet one of the strongest indicators of success is not the technology itself. It is whether leadership is genuinely bought in.",
          },
          {
            type: "paragraph",
            text:
              "Without that support, transformation usually becomes another initiative that sounds important but struggles to gain traction in daily business life.",
          },
          { type: "heading", text: "Leadership sets the direction" },
          {
            type: "paragraph",
            text:
              "People look to leadership for signals about what truly matters. If leaders are clear about why change is happening and what outcome matters most, teams are far more likely to move in the same direction.",
          },
          { type: "heading", text: "Support means more than approval" },
          {
            type: "paragraph",
            text:
              "Leadership buy-in is not simply saying yes to a project and moving on. It means staying involved, asking thoughtful questions, removing obstacles and making sure the change remains connected to the wider business strategy.",
          },
          { type: "heading", text: "People pay attention to actions" },
          {
            type: "paragraph",
            text:
              "Teams notice whether leaders make time for the work, reinforce the priorities behind it and use the same language they expect everyone else to use. Visible behaviour creates belief much faster than announcements do.",
          },
          { type: "heading", text: "Transformation creates uncertainty" },
          {
            type: "paragraph",
            text:
              "Any meaningful change introduces questions. People wonder what will change, what is expected of them and whether the business is solving the right problem. Silence from leadership often fills that uncertainty with doubt.",
          },
          { type: "heading", text: "Leadership creates confidence" },
          {
            type: "paragraph",
            text:
              "Strong leaders help people see the purpose behind the work. They create confidence by being honest about the challenges, consistent in their messaging and clear about the destination.",
          },
          { type: "heading", text: "Transformation is not an IT project" },
          {
            type: "paragraph",
            text:
              "Technology may enable change, but transformation affects processes, decisions, customers and culture. That is why it needs business leadership, not just technical ownership.",
          },
          { type: "heading", text: "The best leaders stay curious" },
          {
            type: "paragraph",
            text:
              "Leaders do not need all the answers. What matters more is their willingness to stay curious, listen to different parts of the business and keep asking whether the work is solving the right problem.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Transformation gains momentum when leadership is visible, practical and consistent. If buy-in is weak, the initiative usually becomes fragmented. If buy-in is real, people feel the direction and start moving with far more confidence.",
          },
          {
            type: "paragraph",
            text:
              "Planning a business transformation? Compass™ helps leadership teams create clarity before important decisions are made, so change starts with alignment rather than assumptions.",
          },
        ],
      },
      {
        slug: "technology-doesnt-transform-businesses-people-do",
        tag: "Leadership",
        title: "Technology Doesn't Transform Businesses. People Do.",
        description:
          "Why people matter more than the software itself.",
        body: [
          {
            type: "paragraph",
            text:
              "Technology often gets the credit for business transformation, but software on its own does not change a business. People do. They decide, adapt, communicate, improve and make the new way of working real.",
          },
          { type: "heading", text: "Technology is only a tool" },
          {
            type: "paragraph",
            text:
              "Good tools can support a business brilliantly, but they do not create direction by themselves. A system can speed work up, improve visibility and reduce frustration, but only if the business is clear about what it is trying to achieve.",
          },
          { type: "heading", text: "Transformation begins with a decision" },
          {
            type: "paragraph",
            text:
              "Transformation starts when leadership decides to improve how the business works. That decision shapes priorities, investment and the energy behind the initiative long before implementation begins.",
          },
          { type: "heading", text: "Change can be uncomfortable" },
          {
            type: "paragraph",
            text:
              "Even positive change can feel disruptive. New workflows, responsibilities and expectations ask people to move away from what feels familiar. That human reality cannot be solved by software alone.",
          },
          { type: "heading", text: "Communication matters more than software" },
          {
            type: "paragraph",
            text:
              "People need to understand what is changing, why it matters and how it affects their work. Clear communication usually has more impact on adoption than technical features do.",
          },
          { type: "heading", text: "Involve people early" },
          {
            type: "paragraph",
            text:
              "The people closest to the work often see friction, duplication and hidden effort most clearly. Bringing them into the conversation early leads to better decisions and stronger ownership later on.",
          },
          { type: "heading", text: "Technology should remove frustration" },
          {
            type: "paragraph",
            text:
              "The strongest technology decisions usually make work simpler. They remove repeated effort, clarify responsibilities and support better service rather than adding another layer of complexity.",
          },
          { type: "heading", text: "Invest in your people" },
          {
            type: "paragraph",
            text:
              "Training, support and thoughtful onboarding are not extras. They are part of the transformation itself. When people feel equipped, confidence grows and momentum builds.",
          },
          { type: "heading", text: "Success is not measured by implementation" },
          {
            type: "paragraph",
            text:
              "A system going live is not the finish line. Real success shows up in better decisions, smoother operations, stronger adoption and a business that works more effectively than before.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Technology can enable transformation, but people are the ones who make it succeed. When a business supports its people well, even complex change becomes more practical, more human and more sustainable.",
          },
          {
            type: "paragraph",
            text:
              "Looking to transform your business? Compass™ helps you understand the people, process and strategy behind the change before technology decisions begin.",
          },
        ],
      },
      {
        slug: "why-every-digital-transformation-should-start-with-trust",
        tag: "Leadership",
        title: "Why Every Digital Transformation Should Start With Trust",
        description:
          "Why trust makes transformation believable and sustainable.",
        body: [
          {
            type: "paragraph",
            text:
              "When businesses think about digital transformation, they often think about platforms, automation and data. Yet one of the most important foundations is far less technical: trust.",
          },
          { type: "heading", text: "Change always creates questions" },
          {
            type: "paragraph",
            text:
              "Whenever change begins, people naturally ask what it means for them, whether the business is making the right decision and how the future will feel compared with the present.",
          },
          { type: "heading", text: "Trust starts with honesty" },
          {
            type: "paragraph",
            text:
              "Trust grows when leaders are honest about why change is happening, what is known, what is still being worked out and where the challenges may appear. People can handle difficulty better than uncertainty wrapped in vague language.",
          },
          { type: "heading", text: "Involve people, do not surprise them" },
          {
            type: "paragraph",
            text:
              "Transformation is easier to support when people feel included rather than informed at the last minute. Early involvement builds understanding and gives teams space to raise concerns constructively.",
          },
          { type: "heading", text: "Trust grows through consistency" },
          {
            type: "paragraph",
            text:
              "If leadership says one thing but behaves differently, trust erodes quickly. Consistency across decisions, messaging and follow-through is what makes change feel credible.",
          },
          { type: "heading", text: "Technology cannot replace trust" },
          {
            type: "paragraph",
            text:
              "No platform can fix a lack of confidence in leadership, poor communication or unclear motives. Technology can support good change, but it cannot compensate for low trust.",
          },
          { type: "heading", text: "Trust encourages better conversations" },
          {
            type: "paragraph",
            text:
              "When trust is present, people are more likely to speak honestly about risks, process gaps and customer concerns. That leads to stronger decisions and fewer surprises later.",
          },
          { type: "heading", text: "Customers notice trust too" },
          {
            type: "paragraph",
            text:
              "Internal trust often shapes the customer experience. Businesses that communicate clearly and act consistently internally usually do the same externally.",
          },
          { type: "heading", text: "Trust is not built overnight" },
          {
            type: "paragraph",
            text:
              "It is built gradually through everyday behaviour. That is why trust should not be treated as a soft extra. It is a practical part of transformation readiness.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Digital transformation works best when people believe in the intent behind it and trust the people leading it. If trust comes first, adoption becomes easier and change becomes more durable.",
          },
          {
            type: "paragraph",
            text:
              "Building trust before transformation begins is one of the clearest ways to reduce friction later. Compass™ helps leadership teams create that clarity from the start.",
          },
        ],
      },
      {
        slug: "why-digital-transformation-isnt-an-it-project",
        tag: "Strategy",
        title: "Why Digital Transformation Isn't an IT Project",
        description:
          "Why transformation should be led as a business initiative.",
        body: [
          {
            type: "paragraph",
            text:
              "When a business starts discussing digital transformation, IT is often brought in first. That makes sense on one level, but it can create the wrong impression. Transformation is not primarily an IT project. It is a business improvement initiative.",
          },
          { type: "heading", text: "It is a business initiative" },
          {
            type: "paragraph",
            text:
              "The purpose of transformation is not simply to install better systems. It is to improve how the business operates, serves customers and makes decisions.",
          },
          { type: "heading", text: "Every department has a role to play" },
          {
            type: "paragraph",
            text:
              "Sales, operations, finance, leadership and customer-facing teams all experience the business differently. If transformation is framed too narrowly, valuable perspectives get missed.",
          },
          { type: "heading", text: "IT enables transformation" },
          {
            type: "paragraph",
            text:
              "IT is essential, but its role is to enable the business strategy with the right tools, architecture and delivery support. That is different from owning the whole transformation in isolation.",
          },
          { type: "heading", text: "Leadership must lead" },
          {
            type: "paragraph",
            text:
              "Because transformation touches priorities, investment and ways of working, leadership needs to remain visibly engaged. The business cannot delegate strategic change entirely to a technical function.",
          },
          { type: "heading", text: "Do not measure success by implementation" },
          {
            type: "paragraph",
            text:
              "A successful rollout is useful, but it is not the full measure of success. Better outcomes show up in improved performance, adoption, clarity and customer experience.",
          },
          { type: "heading", text: "Focus on people and processes first" },
          {
            type: "paragraph",
            text:
              "Before technology choices are locked in, it helps to understand how work happens today, where friction lives and what future-state improvement matters most.",
          },
          { type: "heading", text: "Collaboration is essential" },
          {
            type: "paragraph",
            text:
              "Strong transformation requires collaboration across the business. The more connected the conversations are, the less likely the change is to become detached from operational reality.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Digital transformation needs technical excellence, but it also needs business clarity. When it is led as a business initiative, technology becomes far more effective because it is serving a better-defined purpose.",
          },
          {
            type: "paragraph",
            text:
              "Planning a digital transformation? Compass™ helps organisations define the business case, process reality and improvement priorities before major technology decisions are made.",
          },
        ],
      },
      {
        slug: "the-cost-of-doing-nothing",
        tag: "Strategy",
        title: "The Cost of Doing Nothing",
        description:
          "Why doing nothing often costs more than expected.",
        body: [
          {
            type: "paragraph",
            text:
              "When businesses consider improvement work, one of the first questions is often whether they can afford to do it. A more useful question is sometimes the opposite: can you afford not to?",
          },
          { type: "heading", text: "Small inefficiencies become expensive" },
          {
            type: "paragraph",
            text:
              "Minor delays, duplicate tasks and unclear handoffs can look manageable day to day. Over time, they build into a meaningful operational cost.",
          },
          { type: "heading", text: "Manual work has a hidden price" },
          {
            type: "paragraph",
            text:
              "Repeated admin, avoidable checking and spreadsheet workarounds absorb time that could be used for customer value, growth and better decisions.",
          },
          { type: "heading", text: "Customers feel the impact too" },
          {
            type: "paragraph",
            text:
              "Inefficiency is rarely invisible to customers. Slow response times, inconsistent service and preventable errors affect trust and can quietly push opportunities away.",
          },
          { type: "heading", text: "Growth becomes more difficult" },
          {
            type: "paragraph",
            text:
              "A business can often tolerate inefficient processes at one size, but growth tends to magnify the problem. What once felt workable can quickly become a serious constraint.",
          },
          { type: "heading", text: "Delaying decisions does not remove the problem" },
          {
            type: "paragraph",
            text:
              "Waiting can feel safer in the short term, but in many cases it simply allows the cost of friction to keep accumulating. The issue does not disappear. It just becomes more familiar.",
          },
          { type: "heading", text: "Improvement does not always require major investment" },
          {
            type: "paragraph",
            text:
              "Not every problem needs a large transformation programme. Sometimes meaningful gains come from clearer priorities, better process design or a more practical use of existing tools.",
          },
          { type: "heading", text: "Every business has an opportunity cost" },
          {
            type: "paragraph",
            text:
              "Time spent compensating for poor process is time not spent improving service, strengthening relationships or pursuing growth. That missed opportunity matters.",
          },
          { type: "heading", text: "The goal is not change for the sake of change" },
          {
            type: "paragraph",
            text:
              "The point is not to chase every new idea. It is to understand where inaction is quietly costing the business more than expected, then respond with intention.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Doing nothing can feel neutral, but it rarely is. Hidden inefficiencies, delayed decisions and missed opportunities all carry a price. The most practical next step is often to understand the current cost clearly before deciding what change is worth pursuing.",
          },
          {
            type: "paragraph",
            text:
              "Not sure where your biggest opportunities lie? Compass™ helps businesses identify operational friction and focus attention where the return is most meaningful.",
          },
        ],
      },
      {
        slug: "technology-should-follow-strategy-not-lead-it",
        tag: "Strategy",
        title: "Technology Should Follow Strategy, Not Lead It",
        description:
          "Why strategy should shape technology decisions.",
        body: [
          {
            type: "paragraph",
            text:
              "With so many tools available, it is easy to start with software. New platforms, automation tools and AI products make improvement feel immediately accessible. But good decisions still need a destination before they need a tool.",
          },
          { type: "heading", text: "Start with the destination" },
          {
            type: "paragraph",
            text:
              "A business should first be clear about what it is trying to improve, where it wants to go and what success looks like. That direction is what gives technology choices meaning.",
          },
          { type: "heading", text: "Technology is a means, not an end" },
          {
            type: "paragraph",
            text:
              "Software is most useful when it supports a defined business goal. Without that context, tools can create activity without creating progress.",
          },
          { type: "heading", text: "Do not chase trends" },
          {
            type: "paragraph",
            text:
              "Not every new trend belongs in every business. Adopting technology because it sounds current can pull attention away from more practical improvements.",
          },
          { type: "heading", text: "Strategy creates better decisions" },
          {
            type: "paragraph",
            text:
              "When priorities are clear, it becomes easier to evaluate options, say no to distractions and invest in the tools that genuinely support the business model.",
          },
          { type: "heading", text: "Good strategy creates simplicity" },
          {
            type: "paragraph",
            text:
              "Clarity reduces unnecessary complexity. Instead of layering technology onto confusion, the business can simplify the process first and then choose tools that reinforce it.",
          },
          { type: "heading", text: "Technology should support people" },
          {
            type: "paragraph",
            text:
              "A strong strategy also considers adoption. The best tools are not just powerful. They are practical for the people who need to use them consistently.",
          },
          { type: "heading", text: "Review before you replace" },
          {
            type: "paragraph",
            text:
              "Sometimes businesses need new technology. Other times they simply need to use existing systems more effectively. Strategy helps distinguish between the two.",
          },
          { type: "heading", text: "Strategy is never finished" },
          {
            type: "paragraph",
            text:
              "Direction should be reviewed as the business grows, markets shift and customer expectations change. Technology decisions should evolve alongside that thinking, not run ahead of it.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Technology works best when it follows a clear strategy. If the business knows where it is going, software becomes far easier to choose, justify and implement well.",
          },
          {
            type: "paragraph",
            text:
              "Start with your strategy, not your software. Compass™ is designed to help businesses create that clarity before making technology decisions that shape the future.",
          },
        ],
      },
    ],
  },
  {
    slug: "change-management",
    title: "Change Management",
    description:
      "People-first guidance for leading change with clarity, trust and steady adoption.",
    articles: [
      {
        slug: "why-employees-resist-change",
        tag: "Change",
        title: "Why Employees Resist Change (And What They're Really Saying)",
        description:
          "Why resistance is usually a response to uncertainty, not change itself.",
        body: [
          {
            type: "paragraph",
            text:
              "One of the biggest misconceptions about business transformation is that people do not like change. In reality, people change jobs, move house, learn new skills and adapt to new technology all the time. What employees usually resist is not change itself, but the uncertainty that comes with it.",
          },
          {
            type: "paragraph",
            text:
              "Understanding that difference can completely change the way leaders approach transformation. When someone questions a new system or a different way of working, it is easy to assume they are being negative. More often, they are trying to understand how the change will affect them.",
          },
          { type: "heading", text: "Resistance often has a reason" },
          {
            type: "paragraph",
            text:
              "Behind many objections are questions that have not been answered clearly enough.",
          },
          {
            type: "list",
            items: [
              "Will my role change?",
              "Will I receive enough training?",
              "Will this make my job more difficult?",
              "Will I still be able to do my work well?",
            ],
          },
          {
            type: "paragraph",
            text:
              "These are not unreasonable concerns. They are human ones. If leaders treat them seriously, they often uncover what people genuinely need in order to move forward with confidence.",
          },
          { type: "heading", text: '"We have always done it this way"' },
          {
            type: "paragraph",
            text:
              "Almost every organisation has heard this phrase. It is often dismissed as people refusing to move forward, but sometimes it is asking a much more useful question: is there a good reason we are changing? People invest years learning how to do their jobs well, so when a familiar process changes, they naturally want to understand why.",
          },
          {
            type: "paragraph",
            text:
              "Explaining the purpose behind the change is far more effective than simply insisting that change is necessary.",
          },
          { type: "heading", text: "Experience is valuable" },
          {
            type: "paragraph",
            text:
              "Employees who have worked in a business for many years often understand things that are not written down anywhere. They know which processes work, where problems usually occur and what customers expect. When these employees raise concerns, it is worth listening. Resistance can be valuable feedback if leaders are willing to hear it.",
          },
          { type: "heading", text: "Silence can be more concerning than resistance" },
          {
            type: "paragraph",
            text:
              "Leaders sometimes worry when employees ask difficult questions. In reality, questions are often a sign that people are engaged. The greater concern is silence. When people stop asking questions altogether, they may have stopped believing their views matter. Successful transformation depends on open conversations, not perfect agreement.",
          },
          { type: "heading", text: "Involve people early" },
          {
            type: "paragraph",
            text:
              "One of the simplest ways to reduce resistance is to involve people before decisions are finalised. Ask for their views, understand their daily challenges and invite them to test new ideas. People do not expect every suggestion to be accepted, but they do want to know they have been heard.",
          },
          {
            type: "paragraph",
            text:
              "When employees feel involved, they are far more likely to support the outcome.",
          },
          { type: "heading", text: "Build confidence, not compliance" },
          {
            type: "paragraph",
            text:
              "It is tempting to focus on getting everyone to follow the new process as quickly as possible. But compliance is not the same as confidence. Someone can follow instructions without believing in them. Real transformation happens when people understand the purpose behind the change and feel confident using the new way of working. That takes communication, training, support and patience.",
          },
          { type: "heading", text: "Leaders set the tone" },
          {
            type: "paragraph",
            text:
              "Employees pay close attention to how leaders respond during periods of change. If leaders are open, calm and willing to listen, people feel more comfortable raising concerns. If leaders become defensive or dismissive, trust quickly disappears. The way leaders respond to resistance often determines whether it becomes an obstacle or an opportunity.",
          },
          { type: "heading", text: "Change is something you do with people" },
          {
            type: "paragraph",
            text:
              "One of the biggest mistakes organisations make is treating change as something that is done to employees. Successful businesses take a different approach. They involve people in the journey, explain the reasons behind decisions, listen and adjust where necessary. Transformation becomes something people help create rather than something they are expected to accept.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "When employees resist change, it is easy to focus on the behaviour. It is far more valuable to understand the reason behind it. Most people are not trying to make transformation more difficult. They are trying to understand how it affects them and whether the business is moving in the right direction.",
          },
          {
            type: "paragraph",
            text:
              "Leaders who take the time to listen often discover that resistance is not the problem. It is one of the most useful sources of feedback they will receive. Behind many concerns is a simple question: help me understand where we are going. When leaders answer that question well, resistance often becomes support.",
          },
          {
            type: "paragraph",
            text:
              "Leading your business through change? Successful transformation is not just about introducing new technology. Through Compass?, VULA helps leadership teams build understanding, reduce uncertainty and create the confidence needed for lasting change.",
          },
        ],
      },
      {
        slug: "how-to-build-confidence-during-business-change",
        tag: "Change",
        title: "How to Build Confidence During Business Change",
        description:
          "How leaders create confidence so people move forward together.",
        body: [
          {
            type: "paragraph",
            text:
              "Change is a natural part of every successful business. Markets evolve, customer expectations shift, technology advances and organisations grow. Yet for many leaders, the biggest challenge is not deciding what needs to change. It is helping people feel confident enough to embrace it.",
          },
          {
            type: "paragraph",
            text:
              "Confidence is not created by announcing a new project or introducing new technology. It is built through the way leaders communicate, involve people and guide them through the journey. When confidence grows, change becomes much easier.",
          },
          { type: "heading", text: "People do not expect certainty" },
          {
            type: "paragraph",
            text:
              "One of the biggest misconceptions about leadership is that you need to have every answer before you begin. You do not. Most employees understand that change brings uncertainty. What they need is not perfection. They need confidence that the business has a clear direction.",
          },
          {
            type: "paragraph",
            text:
              "It is perfectly acceptable to say, \"We do not have every detail yet, but here is what we know today.\" Being honest builds trust. Pretending to have all the answers usually has the opposite effect.",
          },
          { type: "heading", text: "Explain the reason behind the change" },
          {
            type: "paragraph",
            text:
              "People are far more willing to support change when they understand why it is happening. Simply telling employees that a new system is being introduced is not enough. Help them see the bigger picture.",
          },
          {
            type: "list",
            items: [
              "Is the goal to improve customer service?",
              "Reduce repetitive work?",
              "Support future growth?",
              "Make better decisions?",
            ],
          },
          {
            type: "paragraph",
            text:
              "When people understand the purpose, they stop seeing change as another task and start seeing it as part of a shared goal.",
          },
          { type: "heading", text: "Create small wins" },
          {
            type: "paragraph",
            text:
              "Large transformation projects can feel overwhelming. Breaking them into smaller milestones makes progress easier to see. Celebrate improvements along the way. Perhaps a process that once took an hour now takes fifteen minutes. Maybe a new report is helping managers make faster decisions. Or perhaps customers are receiving quicker responses. These wins give people confidence that the effort is making a difference.",
          },
          {
            type: "paragraph",
            text:
              "Progress builds momentum.",
          },
          { type: "heading", text: "Give people time to learn" },
          {
            type: "paragraph",
            text:
              "Learning something new takes time. Whether it is a new process, a different way of working or a new piece of software, people need the opportunity to practise and ask questions. Expecting everyone to become experts overnight creates unnecessary pressure.",
          },
          {
            type: "paragraph",
            text:
              "Good leaders create an environment where learning is encouraged, questions are welcomed and mistakes become opportunities to improve rather than reasons for blame. That is how confidence grows.",
          },
          { type: "heading", text: "Make change a conversation" },
          {
            type: "paragraph",
            text:
              "One-way communication rarely builds confidence. People want to know that their views matter. Create opportunities for feedback. Ask what is working, what is difficult and what could be improved. Sometimes the most valuable ideas come from the people using the process every day.",
          },
          {
            type: "paragraph",
            text:
              "Listening does not mean changing every decision. It means showing people that their experience is valued.",
          },
          { type: "heading", text: "Be consistent" },
          {
            type: "paragraph",
            text:
              "During periods of change, consistency is incredibly important. Regular updates, even when there is little progress to report, help people stay informed. Silence often creates uncertainty and people begin filling the gaps with assumptions. A short update saying, \"Here is where we are and here is what happens next,\" is often enough to keep confidence high.",
          },
          { type: "heading", text: "Confidence starts with leadership" },
          {
            type: "paragraph",
            text:
              "Employees take their cues from leaders. If leaders appear uncertain, frustrated or disconnected, those feelings often spread throughout the organisation. That does not mean leaders should pretend everything is perfect. It means they should remain visible, approachable and committed to the journey. People do not expect flawless leadership. They value authentic leadership.",
          },
          { type: "heading", text: "Remember the human side" },
          {
            type: "paragraph",
            text:
              "Every transformation project includes plans, timelines and milestones. But behind every project are people: people learning new skills, adapting to new responsibilities and balancing the demands of work while trying to understand what is changing. When leaders recognise the human side of transformation, they make better decisions not just for the project, but for the business as a whole.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Business change will always bring uncertainty. That is part of growth. The goal is not to remove every concern. It is to create enough confidence that people are willing to move forward together.",
          },
          {
            type: "paragraph",
            text:
              "Confidence comes from honest communication, clear direction, visible leadership, listening, support and recognising that successful transformation is as much about people as it is about processes or technology. When people feel confident, they do not simply accept change. They become part of it. That is when transformation starts to create lasting results.",
          },
          {
            type: "paragraph",
            text:
              "Helping your team navigate change? At VULA, we believe successful transformation is built on confidence, not confusion. Through Compass?, we help leadership teams create clarity, involve their people and build the trust needed for meaningful, lasting change.",
          },
        ],
      },
      {
        slug: "why-communication-is-your-most-important-transformation-tool",
        tag: "Change",
        title: "Why Communication Is Your Most Important Transformation Tool",
        description:
          "Why communication shapes confidence, alignment and adoption during change.",
        body: [
          {
            type: "paragraph",
            text:
              "When businesses plan a transformation project, they usually focus on the things they can see: the budget, the timeline, the software, the processes and the milestones. All of these matter. But one of the most influential factors in the success of any transformation often receives far less attention: communication.",
          },
          {
            type: "paragraph",
            text:
              "Projects rarely fail because people do not understand the technology. They struggle because people do not understand the purpose behind the change. When communication is clear, people feel informed. When people feel informed, they become more confident. And confident people are far more willing to embrace change.",
          },
          { type: "heading", text: "Communication creates clarity" },
          {
            type: "paragraph",
            text:
              "Think about the last time you were asked to do something without understanding why. You probably completed the task, but you may have questioned its purpose. The same happens during business transformation. If employees are only told what is changing, they will naturally start filling in the gaps themselves.",
          },
          {
            type: "list",
            items: [
              "Why is this happening?",
              "What does it mean for me?",
              "What is the long-term plan?",
            ],
          },
          {
            type: "paragraph",
            text:
              "Good communication answers those questions before uncertainty has a chance to grow.",
          },
          { type: "heading", text: "Start talking early" },
          {
            type: "paragraph",
            text:
              "One of the biggest mistakes businesses make is waiting until every detail has been finalised before communicating with their teams. The intention is usually good. Leaders want to avoid sharing incomplete information. But waiting too long often creates more uncertainty than sharing early.",
          },
          {
            type: "paragraph",
            text:
              "People notice when meetings start happening. They hear conversations. They see changes being discussed. If communication does not come from leadership, people will create their own explanations. Sharing what you know, even if the project is still evolving, is almost always the better approach.",
          },
          { type: "heading", text: 'Explain the "why"' },
          {
            type: "paragraph",
            text:
              "It is easy to communicate a list of changes. It is much harder, and much more valuable, to explain why those changes matter. Compare these two messages: \"We are introducing a new system\" and \"We are introducing a new system because our current process is slowing the business down, creating unnecessary manual work and making it harder to serve our customers.\" The second message creates understanding.",
          },
          {
            type: "paragraph",
            text:
              "People are far more likely to support a change when they understand its purpose.",
          },
          { type: "heading", text: "Communication is not a presentation" },
          {
            type: "paragraph",
            text:
              "Many organisations treat communication as a one-off event. An announcement is made, a presentation is delivered, an email is sent, and then everyone is expected to move forward. Real communication does not work like that. It is ongoing. It involves conversations, questions, feedback, updates and listening.",
          },
          {
            type: "paragraph",
            text:
              "Successful transformation is not built on a single presentation. It is built on hundreds of meaningful conversations.",
          },
          { type: "heading", text: "Listen as much as you speak" },
          {
            type: "paragraph",
            text:
              "Communication is not only about sharing information. It is also about understanding how people are experiencing the change. Employees often identify practical challenges that leaders have not considered. Customers may highlight opportunities for improvement. Different departments may have different priorities. Listening creates better decisions and helps people feel that they are part of the journey rather than simply being told what to do.",
          },
          { type: "heading", text: "Consistency matters" },
          {
            type: "paragraph",
            text:
              "One of the quickest ways to create confusion is to deliver different messages to different groups. If leadership says one thing, managers say another and project teams communicate something different, confidence quickly disappears. People do not expect leaders to repeat the same script, but they do expect the message to be consistent. A shared understanding creates alignment. Alignment creates momentum.",
          },
          { type: "heading", text: "Communication continues after implementation" },
          {
            type: "paragraph",
            text:
              "Many projects assume that communication ends when the new system goes live. In reality, that is often when it is needed most. People are still learning. Questions continue to arise. Processes are still being refined. Regular updates, additional training and opportunities for feedback help the business continue improving long after implementation.",
          },
          {
            type: "paragraph",
            text:
              "Transformation is not an event. It is an ongoing journey, and communication should reflect that.",
          },
          { type: "heading", text: "The best communicators build trust" },
          {
            type: "paragraph",
            text:
              "The most effective leaders do not try to have all the answers. Instead, they communicate honestly. They explain decisions, admit when something is not working, celebrate progress and listen carefully. Over time, those habits build something incredibly valuable: trust. When trust exists, transformation becomes much easier.",
          },
          { type: "heading", text: "Final thoughts" },
          {
            type: "paragraph",
            text:
              "Every successful transformation relies on technology, processes and planning. But communication is what connects them all. It gives people clarity, reduces uncertainty, creates confidence and builds trust. Without good communication, even the best strategy can struggle. With it, businesses are far better equipped to navigate change together.",
          },
          {
            type: "paragraph",
            text:
              "Before investing in another tool or introducing another process, ask one simple question: have we communicated the journey as clearly as we have planned it? In the end, communication is not just part of transformation. It is one of the most important tools you will ever use.",
          },
          {
            type: "paragraph",
            text:
              "Planning a business transformation? At VULA, we believe that successful change starts with meaningful conversations. Through Compass?, we help leadership teams create clear communication, build alignment and ensure that people understand not only what is changing, but why it matters.",
          },
        ],
      },
    ],
  },
  {
    slug: "process-improvement",
    title: "Process Improvement",
    description:
      "Operational ideas for removing friction and improving execution.",
    articles: [
      {
        slug: "spotting-process-bottlenecks",
        tag: "Guide",
        title: "How to spot process bottlenecks early",
        description:
          "A practical method for identifying the tasks, approvals and handoffs that slow everything down.",
      },
      {
        slug: "documenting-critical-workflows",
        tag: "Checklist",
        title: "Documenting your most critical workflows",
        description:
          "A useful checklist for capturing how work really happens across your business.",
      },
      {
        slug: "small-fixes-big-impact",
        tag: "Insight",
        title: "Why small process fixes can create outsized impact",
        description:
          "Where minor operational improvements often unlock the biggest relief.",
      },
    ],
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    description:
      "Business-friendly guidance for applying AI in useful, realistic ways.",
    articles: [
      {
        slug: "ai-for-smes",
        tag: "Playbook",
        title: "AI for SMEs, without the hype",
        description:
          "A straightforward view of where AI helps, where it does not, and how to start responsibly.",
      },
      {
        slug: "ai-readiness-check",
        tag: "Checklist",
        title: "Are you ready to use AI in the business?",
        description:
          "A readiness check covering data, processes, ownership and expected value.",
      },
      {
        slug: "human-plus-ai-workflows",
        tag: "Guide",
        title: "Designing human-plus-AI workflows",
        description:
          "How to combine automation and human judgment without creating confusion or risk.",
      },
    ],
  },
  {
    slug: "software-and-technology",
    title: "Software and Technology",
    description:
      "Advice for choosing and using technology as a business enabler.",
    articles: [
      {
        slug: "choosing-the-right-stack",
        tag: "Guide",
        title: "Choosing technology that fits your business",
        description:
          "What to look for when evaluating software, websites, platforms and integrations.",
      },
      {
        slug: "website-as-business-tool",
        tag: "Insight",
        title: "The website as a business tool",
        description:
          "How to think beyond aesthetics and use your website to support real commercial goals.",
      },
      {
        slug: "tech-partner-checklist",
        tag: "Checklist",
        title: "Questions to ask a technology partner",
        description:
          "A better checklist for selecting support beyond price and surface-level portfolio work.",
      },
    ],
  },
  {
    slug: "business-growth",
    title: "Business Growth",
    description:
      "Ideas for creating traction and supporting sustainable growth.",
    articles: [
      {
        slug: "growth-levers",
        tag: "Guide",
        title: "Finding your most practical growth levers",
        description:
          "A focused look at where growth usually comes from for service-led businesses.",
      },
      {
        slug: "lead-generation-basics",
        tag: "Checklist",
        title: "The essentials of a healthier lead pipeline",
        description:
          "A quick checklist to help you assess whether your current marketing is creating real opportunities.",
      },
      {
        slug: "scaling-with-clarity",
        tag: "Insight",
        title: "Growing without creating operational chaos",
        description:
          "Why structure, consistency and simple systems matter as much as ambition.",
      },
    ],
  },
];

export function getResourceSectionBySlug(slug: string) {
  return resourceSections.find((section) => section.slug === slug);
}

export function getResourceArticle(sectionSlug: string, articleSlug: string) {
  const section = getResourceSectionBySlug(sectionSlug);

  if (!section) {
    return null;
  }

  const article = section.articles.find((entry) => entry.slug === articleSlug);

  if (!article) {
    return null;
  }

  return { section, article };
}

