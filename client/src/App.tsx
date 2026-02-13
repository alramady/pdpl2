import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useState, useEffect } from "react";

// Pages
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import ThreatMap from "./pages/ThreatMap";
import SmartRasid from "./pages/SmartRasid";
import Leaks from "./pages/Leaks";
import Telegram from "./pages/Telegram";
import DarkWeb from "./pages/DarkWeb";
import PasteSites from "./pages/PasteSites";
import VendorFiles from "./pages/VendorFiles";
import LiveMonitoring from "./pages/LiveMonitoring";
import PIIClassifier from "./pages/PIIClassifier";
import EvidenceChain from "./pages/EvidenceChain";
import ThreatHunting from "./pages/ThreatHunting";
import OSINTTools from "./pages/OSINTTools";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import AccuracyMetrics from "./pages/AccuracyMetrics";
import MonitoringTasks from "./pages/MonitoringTasks";
import AlertChannels from "./pages/AlertChannels";
import ScheduledReports from "./pages/ScheduledReports";
import Verification from "./pages/Verification";
import Login from "./pages/Login";

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("pdpl_auth") === "true";
  });

  const handleLogin = () => {
    localStorage.setItem("pdpl_auth", "true");
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/reports" component={Reports} />
      <Route path="/threat-map" component={ThreatMap} />
      <Route path="/smart-rasid" component={SmartRasid} />
      <Route path="/leaks" component={Leaks} />
      <Route path="/telegram" component={Telegram} />
      <Route path="/darkweb" component={DarkWeb} />
      <Route path="/paste-sites" component={PasteSites} />
      <Route path="/vendor-files" component={VendorFiles} />
      <Route path="/live-monitoring" component={LiveMonitoring} />
      <Route path="/pii-classifier" component={PIIClassifier} />
      <Route path="/evidence-chain" component={EvidenceChain} />
      <Route path="/threat-hunting" component={ThreatHunting} />
      <Route path="/osint-tools" component={OSINTTools} />
      <Route path="/knowledge-graph" component={KnowledgeGraph} />
      <Route path="/accuracy-metrics" component={AccuracyMetrics} />
      <Route path="/monitoring-tasks" component={MonitoringTasks} />
      <Route path="/alert-channels" component={AlertChannels} />
      <Route path="/scheduled-reports" component={ScheduledReports} />
      <Route path="/verification" component={Verification} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
