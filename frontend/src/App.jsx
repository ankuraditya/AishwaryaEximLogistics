import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useWebsiteSettings } from "./hooks/useWebsiteSettings";

function App() {
  const settings = useWebsiteSettings();

  useEffect(() => {
    const root = document.documentElement;
    if (settings.branding?.primary_color) {
      root.style.setProperty("--ael-primary", settings.branding.primary_color);
    }
    if (settings.branding?.secondary_color) {
      root.style.setProperty("--ael-secondary", settings.branding.secondary_color);
    }

    if (settings.branding?.favicon) {
      let favicon = document.head.querySelector('link[rel="icon"]');
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      favicon.href = settings.branding.favicon;
    }
  }, [settings.branding]);

  return <AppRoutes />;
}

export default App;
