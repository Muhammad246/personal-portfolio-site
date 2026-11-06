export type Project = {
  slug: string;
  title: string;
  category: string;
  number: string;
  githubUrl: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "rag-financial-report-analyzer",
    title: "RAG Financial Report Analyzer",
    category: "AI · RAG",
    number: "01",
    githubUrl: "https://github.com/Muhammad246/RAG_Financial_Report_Analyzer",
  },
  {
    slug: "netflix-text-to-sql-agent",
    title: "Netflix Text-to-SQL Agent",
    category: "AI · Data",
    number: "02",
    githubUrl: "https://github.com/Muhammad246/Netflix-SQL-Agent",
  },
  {
    slug: "inventory-analytics-pwc-case-study",
    title: "Inventory Analytics — PwC Case Study",
    category: "Analytics",
    number: "03",
    githubUrl: "https://github.com/Muhammad246/Inventory-Analytics---PwC-Case-Study",
  },
  {
    slug: "chicago-taxi-fare-predictor",
    title: "Chicago Taxi Fare Predictor",
    category: "Machine learning",
    number: "04",
    githubUrl: "https://github.com/Muhammad246/streamlit-taxi-fare-app",
    demoUrl: "https://chicago-taxi-fare.streamlit.app/",
  },
  {
    slug: "computer-shop-sales-dashboard",
    title: "Computer Shop Sales Dashboard",
    category: "Business intelligence",
    number: "05",
    githubUrl: "https://github.com/Muhammad246/Computer_Shop_Analysis_Python",
    demoUrl: "https://computer-shop-dashboard.streamlit.app/",
  },
];

export const skills = [
  { label: "Programming", items: ["Python", "SQL", "JavaScript"] },
  { label: "Analytics", items: ["Excel", "Power BI", "Pandas"] },
  { label: "Backend", items: ["FastAPI", "PostgreSQL"] },
  { label: "AI engineering", items: ["LangChain", "LangGraph", "RAG"] },
  { label: "Tools", items: ["Docker", "Git", "GitHub"] },
];
