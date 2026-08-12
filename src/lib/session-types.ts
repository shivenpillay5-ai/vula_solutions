export type Stakeholder = {
  name: string;
  title: string;
  department: string;
  keyConcern: string;
};

export type ActionItem = {
  action: string;
  owner: string;
  dueDate: string;
  priority: string;
};

export type Department = {
  department: string;
  head: string;
  headcount: string;
  primaryChallenge: string;
};

export type EssentialSession = {
  sessionDate: string;
  sessionLocation: string;
  consultant: string;
  clientName: string;
  clientTitle: string;
  company: string;
  industry: string;
  companySize: string;
  email: string;
  phone: string;
  website: string;
  businessDescription: string;
  targetClients: string;
  yearsInOperation: string;
  revenueRange: string;
  whatBroughtYouHere: string;
  biggestChallenge: string;
  goalIn12Months: string;
  triedBefore: string;
  sessionSuccess: string;
  hasWebsite: string;
  websiteUrl: string;
  websiteMobile: string;
  googleBusiness: string;
  socialPlatforms: string[];
  hasOnlineReviews: string;
  digitalRating: string;
  digitalNotes: string;
  currentTools: string;
  biggestTimeDrain: string;
  thingsFallThrough: string;
  clientExperience: string;
  operationsNotes: string;
  keyObservations: string;
  strengthsToBuildOn: string;
  quickWins: string;
  roadmapImmediate: string;
  roadmapShortTerm: string;
  roadmapLongerTerm: string;
  recommendedSolutions: string[];
  agreedActions: string;
  reportDeliveryDate: string;
  additionalNotes: string;
};

export type ProfessionalSession = EssentialSession & {
  stakeholders: Stakeholder[];
  revenueModel: string;
  growthTrend: string;
  headcount: string;
  teamStructure: string;
  strategicPriorities: string;
  topCompetitors: string;
  keyDifferentiator: string;
  howClientsFind: string;
  whereLooseDeals: string;
  competitiveNotes: string;
  mostRepetitiveTasks: string;
  dataCapture: string;
  aiToolsInUse: string;
  aiReadiness: string;
  topAutomationOpportunity: string;
  twoWeekActions: ActionItem[];
};

export type StrategicSession = ProfessionalSession & {
  departments: Department[];
  externalDependencies: string;
  vision3to5Years: string;
  currentInitiatives: string;
  complianceRequirements: string;
  topRisks: string;
  roadmapNow: string;
  roadmapNext: string;
  roadmapLater: string;
  roadmapFuture: string;
  blueprintWeek1to2: string;
  blueprintWeek3to4: string;
  blueprintMonth2: string;
  blueprintMonth3: string;
  successMetrics: string;
  executiveSponsor: string;
  decisionAuthority: string;
  communicationPlan: string;
  quarterlyReviewDate: string;
  resourceRequirements: string;
};
