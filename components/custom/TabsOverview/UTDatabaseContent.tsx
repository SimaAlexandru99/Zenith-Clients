import { CheckCircle, Users, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import BottomAgency from "components/custom/Charts/BottomAgency";
import TopAgency from "components/custom/Charts/TopAgency";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";
import { useToast } from "hooks/use-toast"; // Use for toast notifications

interface GenderData {
  gender: string;
  count: number;
}

interface AgencyData {
  _id: string;
  averageQ5: number;
  count: number;
}

interface SurveyData {
  completeSurveys: number;
  incompleteSurveys: number;
}

interface CardData {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  description: string;
}

const POLLING_INTERVAL = 300000; // 5 minutes in milliseconds

export default function UTDatabaseContent() {
  const [genderData, setGenderData] = useState<GenderData[]>([]);
  const [agencyData, setAgencyData] = useState<AgencyData[]>([]);
  const [surveyData, setSurveyData] = useState<SurveyData>({ completeSurveys: 0, incompleteSurveys: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast(); // Initialize toast for notifications

  // Function to fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [genderResponse, surveyResponse, agencyResponse] = await Promise.all([
        fetch(`/api/gender-data?db=UT_database`),
        fetch(`/api/survey-status?db=UT_database`),
        fetch(`/api/agency-performance?db=UT_database`),
      ]);

      if (!genderResponse.ok || !surveyResponse.ok || !agencyResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const fetchedGenderData: GenderData[] = (await genderResponse.json()) as GenderData[];
      const fetchedSurveyData: SurveyData = (await surveyResponse.json()) as SurveyData;
      const fetchedAgencyData: AgencyData[] = (await agencyResponse.json()) as AgencyData[];

      setGenderData(fetchedGenderData);
      setSurveyData(fetchedSurveyData);
      setAgencyData(fetchedAgencyData);

      // Show success toast
      toast({
        title: "Data loaded successfully",
        description: "The latest data has been fetched from the server.",
        variant: "default",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      toast({
        title: "Error loading data",
        description: errorMessage,
        variant: "destructive",
      });
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Polling mechanism to re-fetch data every few minutes
  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Set up polling interval
    const intervalId = setInterval(() => {
      fetchData(); // Fetch data at regular intervals
    }, POLLING_INTERVAL);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchData]);

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  const masculinCount = genderData.find((item) => item.gender === "Masculin")?.count || 0;
  const femininCount = genderData.find((item) => item.gender === "Feminin")?.count || 0;

  const cardData: CardData[] = [
    {
      title: "Total Clienți Masculini",
      value: masculinCount,
      icon: Users,
      description: "Clienți bărbați în baza de date UT",
    },
    {
      title: "Total Clienți Femini",
      value: femininCount,
      icon: Users,
      description: "Clienți femei în baza de date UT",
    },
    {
      title: "Sondaj Complet",
      value: surveyData.completeSurveys,
      icon: CheckCircle,
      description: "Număr de sondaje completate",
    },
    {
      title: "Sondaj Incomplet",
      value: surveyData.incompleteSurveys,
      icon: XCircle,
      description: "Număr de sondaje incomplete",
    },
  ];

  const validAgencyData = agencyData.filter((agency) => agency.averageQ5 !== null);

  const topAgencyData = [...validAgencyData]
    .sort((a, b) => b.averageQ5 - a.averageQ5)
    .slice(0, 7)
    .map((agency) => ({
      agency: agency._id.toString(),
      averageQ5: agency.averageQ5,
    }));

  const bottomAgencyData = [...validAgencyData]
    .sort((a, b) => a.averageQ5 - b.averageQ5)
    .slice(0, 7)
    .map((agency) => ({
      agency: agency._id.toString(),
      averageQ5: agency.averageQ5,
    }));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <DataCard key={index} {...card} isLoading={isLoading} />
        ))}
      </div>

      {topAgencyData.length > 0 && <TopAgency data={topAgencyData} />}
      {bottomAgencyData.length > 0 && <BottomAgency data={bottomAgencyData} />}
    </div>
  );
}

function DataCard({ title, value, icon: Icon, description, isLoading }: CardData & { isLoading: boolean }) {
  return (
    <Card className="transition-transform rounded-lg shadow-lg hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? <Skeleton className="w-16 h-6 mb-2 animate-pulse" /> : value}
        </div>
        <p className="text-xs text-muted-foreground">
          {isLoading ? <Skeleton className="w-full h-4 animate-pulse" /> : description}
        </p>
      </CardContent>
    </Card>
  );
}
