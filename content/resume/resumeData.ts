export interface ContactInfo {
  email: string;
  phone: string;
  blog: string;
  website: string;
  linkedin: string;
  github: string;
  location?: string;
  linkedin_en: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  companyDescription?: string;
  location?: string;
  period: string;
  achievements: string[];
}

export interface ProjectItem {
  name: string;
  description: string[];
  summary?: string;
  tech: string[];
  period: string;
  company: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  graduated: string;
  others?: string[];
}

export interface CertificationItem {
  title: string;
  description: string;
}

export interface OtherExperienceItem {
  title: string;
  period: string;
  location?: string;
  description: string[];
}

export interface ResumeData {
  name: string;
  name_en: string;
  role: string;
  contact: ContactInfo;
  currentPosition?: string;
  introduction: string[];
  detailedIntroduction?: string[];
  summary: string[];
  skills: SkillCategory[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  otherExperiences: OtherExperienceItem[];
}

export interface TechnicalDetail {
  title: string;
  points: string[];
}

export interface ProjectData {
  title: string;
  company: string;
  period: string;
  description: string[];
  issues?: string[];
  technicalDetails: TechnicalDetail[];
  achievements: string[];
  tech: string[];
  screenshots?: string[];
}

const resumeData: ResumeData = {
  name: "구민하",
  name_en: "Minha Koo",
  role: "프론트엔드 개발자",
  contact: {
    email: "minha.koo.9@gmail.com",
    phone: "+82 10 7139 5028",
    blog: "",
    website: "",
    linkedin: "https://linkedin.com/in/minha-koo",
    linkedin_en: "linkedin.com/in/minha-koo",
    github: "https://github.com/kkoomin",
  },
  introduction: [],
  summary: [],
  skills: [
    {
      category: "Languages & Frameworks",
      skills: ["Next.js", "React", "TypeScript", "Vue.js", "Nuxt"],
    },
    {
      category: "Libraries & Tools",
      skills: ["TanStack Query", "Zustand", "React Hook Form", "Tailwind CSS"],
    },
  ],
  experiences: [
    {
      company: "(주)에스엘디티 · 솔드아웃",
      title: "프론트엔드 개발자 · 플랫폼 파트",
      period: "2023.02 — 2024.05",
      achievements: [
        "무신사 솔드아웃 상품 판매하기, 결제 페이지 마이그레이션 (Nuxt · Vue2 → Next.js)",
        "중고상품 거래 서비스 신규 기능 개발 및 Zustand 스토어 · 폼 구조 리팩터링",
        "무신사 솔드아웃 APP 내 WebView 영역 기능 개발 및 고도화",
        "PC 웹, 백오피스 어드민 페이지의 기능 추가 개발 및 운영",
      ],
    },
    {
      company: "(주)루나소프트",
      title: "프론트엔드 개발자 · 솔루션개발팀",
      period: "2020.09 — 2023.01",
      achievements: [
        "글로벌 상담센터 TF 참여, 다국어 기반 파트너스센터 어드민 초기 개발",
        "광고 관리 어드민 시스템 프론트엔드 신규 설계, 개발 및 운영 유지보수",
        "이커머스 마케팅 솔루션 어드민 개편, React 기반으로 기능 통합 및 구조 리빌딩",
        "인스타그램 챗봇 빌더, 스마트 배송조회 서비스 등 기타 서비스 개발 및 유지보수",
      ],
    },
  ],
  projects: [],
  education: [
    {
      school: "FlatIron School London",
      degree: "Software Engineering Course",
      graduated: "2019.04 수료",
    },
    {
      school: "이화여자대학교",
      degree: "국어국문학과, 경영학과",
      graduated: "2017.08 졸업",
    },
  ],
  certifications: [
    {
      title: "정보처리기사",
      description: "한국산업인력공단 · 2020.12 취득",
    },
  ],
  otherExperiences: [],
};

export default resumeData;
