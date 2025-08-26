import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, X, Search, Calendar, Trophy, Users, Globe } from "lucide-react";
import "./index.css"; // use "./App.css" se seu CSS estiver nesse arquivo

// Tipos
type Category = "masculino" | "feminino" | "geral";

type News = {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: Category;
  image: string;
};

type MatchResultT = {
  id: number;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  date: string;
  category: Category;
  type: string;
};

// Imagens (confira exatamente nome/extension na pasta!)
import vnlLogo from "./assets/E63GSTWltMTY.png";
import heroImage from "./assets/dgN5Ql3dXl1B.jpeg";
import trophyImage from "./assets/GorJ4qMGyZle.png";
import matchImage from "./assets/SXHCZQE9sTZ2.jpg";

// Mock data
const newsData: News[] = [
  {
    id: 1,
    title: "Polônia conquista o título da VNL Masculina 2025",
    summary:
      "A seleção polonesa derrotou a Itália por 3 sets a 0 na final disputada em Ningbo, China.",
    date: "3 de agosto de 2025",
    category: "masculino",
    image: trophyImage,
  },
  {
    id: 2,
    title: "Itália é campeã da VNL Feminina 2025",
    summary:
      "As azzurre superaram o Brasil na final em Łódź, conquistando seu terceiro título na competição.",
    date: "27 de julho de 2025",
    category: "feminino",
    image: matchImage,
  },
  {
    id: 3,
    title: "Brasil conquista o bronze no masculino",
    summary:
      "A seleção brasileira venceu a Eslovênia por 3 sets a 1 na disputa pelo terceiro lugar.",
    date: "3 de agosto de 2025",
    category: "masculino",
    image: heroImage,
  },
  {
    id: 4,
    title: "VNL 2025 bate recordes de audiência",
    summary:
      "A competição registrou números históricos de visualizações em todo o mundo.",
    date: "4 de agosto de 2025",
    category: "geral",
    image: vnlLogo,
  },
];

const matchResults: MatchResultT[] = [
  {
    id: 1,
    team1: "Polônia",
    team2: "Itália",
    score1: 3,
    score2: 0,
    date: "3 de agosto",
    category: "masculino",
    type: "Final",
  },
  {
    id: 2,
    team1: "Brasil",
    team2: "Eslovênia",
    score1: 3,
    score2: 1,
    date: "3 de agosto",
    category: "masculino",
    type: "3º lugar",
  },
  {
    id: 3,
    team1: "Itália",
    team2: "Brasil",
    score1: 3,
    score2: 1,
    date: "27 de julho",
    category: "feminino",
    type: "Final",
  },
  {
    id: 4,
    team1: "Polônia",
    team2: "Japão",
    score1: 3,
    score2: 0,
    date: "27 de julho",
    category: "feminino",
    type: "3º lugar",
  },
];

// Header
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={vnlLogo} alt="VNL 2025" className="h-10 w-auto" />
            <span className="text-xl font-bold">VNL 2025 News</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Início
            </Link>
            <Link
              to="/masculino"
              className="hover:text-blue-400 transition-colors"
            >
              Masculino
            </Link>
            <Link
              to="/feminino"
              className="hover:text-blue-400 transition-colors"
            >
              Feminino
            </Link>
            <Link to="/times" className="hover:text-blue-400 transition-colors">
              Times
            </Link>
            <Link
              to="/calendario"
              className="hover:text-blue-400 transition-colors"
            >
              Calendário
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Search className="h-5 w-5 cursor-pointer hover:text-blue-400" />
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="py-2 hover:text-blue-400">
                Início
              </Link>
              <Link to="/masculino" className="py-2 hover:text-blue-400">
                Masculino
              </Link>
              <Link to="/feminino" className="py-2 hover:text-blue-400">
                Feminino
              </Link>
              <Link to="/times" className="py-2 hover:text-blue-400">
                Times
              </Link>
              <Link to="/calendario" className="py-2 hover:text-blue-400">
                Calendário
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero
const HeroSection = () => {
  return (
    <section className="relative h-96 bg-gradient-to-r from-blue-900 to-red-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">VNL 2025</h1>
          <p className="text-xl md:text-2xl mb-6">
            Cobertura completa da Liga das Nações de Voleibol
          </p>
          <p className="text-lg opacity-90">
            Acompanhe todos os jogos, resultados e análises dos times masculinos
            e femininos
          </p>
        </div>
      </div>
    </section>
  );
};

// News Card
const NewsCard = ({ news }: { news: News }) => {
  const getCategoryColor = (category: Category) => {
    switch (category) {
      case "masculino":
        return "bg-blue-600";
      case "feminino":
        return "bg-pink-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span
            className={`px-2 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
              news.category
            )}`}
          >
            {news.category.toUpperCase()}
          </span>
          <span className="text-gray-500 text-sm ml-2">{news.date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900">{news.title}</h3>
        <p className="text-gray-600">{news.summary}</p>
      </div>
    </article>
  );
};

// Match Result
const MatchResult = ({ match }: { match: MatchResultT }) => {
  const getCategoryColor = (category: Category) => {
    switch (category) {
      case "masculino":
        return "border-blue-500";
      case "feminino":
        return "border-pink-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <div className={`bg-white rounded-lg p-4 border-l-4 ${getCategoryColor(match.category)} shadow-sm`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-600">{match.type}</span>
        <span className="text-sm text-gray-500">{match.date}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-center">
          <span className="font-semibold">{match.team1}</span>
        </div>
        <div className="mx-4 text-2xl font-bold text-gray-900">
          {match.score1} - {match.score2}
        </div>
        <div className="flex-1 text-center">
          <span className="font-semibold">{match.team2}</span>
        </div>
      </div>
    </div>
  );
};

// Home
const HomePage = () => {
  return (
    <div>
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        {/* Últimas Notícias */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Últimas Notícias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>

        {/* Resultados Recentes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Resultados Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchResults.map((match) => (
              <MatchResult key={match.id} match={match} />
            ))}
          </div>
        </section>

        {/* Números */}
        <section className="bg-gray-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
            VNL 2025 em Números
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">36</div>
              <div className="text-gray-600">Times Participantes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">216</div>
              <div className="text-gray-600">Partidas Disputadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10</div>
              <div className="text-gray-600">Cidades-sede</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">8</div>
              <div className="text-gray-600">Semanas de Competição</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Masculino
const MasculinoPage = () => {
  const masculineNews = newsData.filter((n) => n.category === "masculino");
  const masculineMatches = matchResults.filter((m) => m.category === "masculino");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">VNL Masculina 2025</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Notícias do Masculino</h2>
          <div className="space-y-6">
            {masculineNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Resultados</h2>
          <div className="space-y-4">
            {masculineMatches.map((match) => (
              <MatchResult key={match.id} match={match} />
            ))}
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Classificação Final</h3>
            <ol className="space-y-2">
              <li className="flex items-center">
                <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="font-semibold">1º - Polônia</span>
              </li>
              <li className="flex items-center">
                <Trophy className="h-5 w-5 text-gray-400 mr-2" />
                <span className="font-semibold">2º - Itália</span>
              </li>
              <li className="flex items-center">
                <Trophy className="h-5 w-5 text-orange-500 mr-2" />
                <span className="font-semibold">3º - Brasil</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 mr-2"></span>
                <span>4º - Eslovênia</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feminino
const FemininoPage = () => {
  const feminineNews = newsData.filter((n) => n.category === "feminino");
  const feminineMatches = matchResults.filter((m) => m.category === "feminino");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">VNL Feminina 2025</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Notícias do Feminino</h2>
          <div className="space-y-6">
            {feminineNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Resultados</h2>
          <div className="space-y-4">
            {feminineMatches.map((match) => (
              <MatchResult key={match.id} match={match} />
            ))}
          </div>

          <div className="mt-8 bg-pink-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-pink-900">Classificação Final</h3>
            <ol className="space-y-2">
              <li className="flex items-center">
                <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="font-semibold">1º - Itália</span>
              </li>
              <li className="flex items-center">
                <Trophy className="h-5 w-5 text-gray-400 mr-2" />
                <span className="font-semibold">2º - Brasil</span>
              </li>
              <li className="flex items-center">
                <Trophy className="h-5 w-5 text-orange-500 mr-2" />
                <span className="font-semibold">3º - Polônia</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 mr-2"></span>
                <span>4º - Japão</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

// Times
const TimesPage = () => {
  const teams = [
    { name: "Brasil", category: "masculino", ranking: 3 },
    { name: "Polônia", category: "masculino", ranking: 1 },
    { name: "Itália", category: "masculino", ranking: 2 },
    { name: "Eslovênia", category: "masculino", ranking: 4 },
    { name: "Brasil", category: "feminino", ranking: 2 },
    { name: "Itália", category: "feminino", ranking: 1 },
    { name: "Polônia", category: "feminino", ranking: 3 },
    { name: "Japão", category: "feminino", ranking: 4 },
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Times Participantes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Masculino</h2>
          <div className="space-y-4">
            {teams
              .filter((t) => t.category === "masculino")
              .map((team, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-blue-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-semibold">{team.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">#{team.ranking}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-pink-600">Feminino</h2>
          <div className="space-y-4">
            {teams
              .filter((t) => t.category === "feminino")
              .map((team, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-pink-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-pink-600 mr-2" />
                      <span className="font-semibold">{team.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">#{team.ranking}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Calendário
const CalendarioPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Calendário VNL 2025</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold">Cronograma da Competição</h2>
        </div>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold">Fase Preliminar</h3>
            <p className="text-gray-600">11 de junho - 23 de julho de 2025</p>
            <p className="text-sm text-gray-500">
              Cada equipe joga 12 partidas em diferentes cidades-sede
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold">Quartas de Final</h3>
            <p className="text-gray-600">30 de julho - 31 de julho de 2025</p>
            <p className="text-sm text-gray-500">
              Top 8 equipes avançam para a fase eliminatória
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="text-lg font-semibold">Semifinais</h3>
            <p className="text-gray-600">1 de agosto - 2 de agosto de 2025</p>
            <p className="text-sm text-gray-500">Definição dos finalistas</p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-semibold">Finais</h3>
            <p className="text-gray-600">3 de agosto de 2025</p>
            <p className="text-sm text-gray-500">Disputa pelo bronze e final</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">VNL 2025 News</h3>
            <p className="text-gray-400">
              Sua fonte completa de informações sobre a Liga das Nações de Voleibol 2025.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/masculino" className="hover:text-white">
                  Masculino
                </Link>
              </li>
              <li>
                <Link to="/feminino" className="hover:text-white">
                  Feminino
                </Link>
              </li>
              <li>
                <Link to="/times" className="hover:text-white">
                  Times
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Competição</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Calendário</li>
              <li>Resultados</li>
              <li>Estatísticas</li>
              <li>Classificação</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="flex space-x-4">
              <Globe className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400">www.vnl2025news.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 VNL 2025 News. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

// App
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/masculino" element={<MasculinoPage />} />
            <Route path="/feminino" element={<FemininoPage />} />
            <Route path="/times" element={<TimesPage />} />
            <Route path="/calendario" element={<CalendarioPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
