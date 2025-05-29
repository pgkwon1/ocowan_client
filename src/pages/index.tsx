import Ocowan from "@/components/Ocowan";
import Profile from "@/components/Profile";
import Link from "next/link";
import GitHubCalendar from "react-github-calendar";
import { useSelector } from "react-redux";
import Calendar from "@/components/Calendar";
import { IRootReducer } from "@/store/reducer.dto";
import ConditionalWrapper from "@/components/ConditionalWrapper";
import LoginOverlay from "@/components/LoginOverlay";
import dynamic from "next/dynamic";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import GuideSection from "@/components/GuideSection";
import AccordionSection from "@/components/AccordionSection";
import TipsSection from "@/components/TipsSection";
import FAQSection from "@/components/FAQSection";
import Head from "next/head";
import LevelSystemSection from "@/components/LevelSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>오코완 - 개발자 습관 관리 </title>
      </Head>
      <AccordionSection defaultOpen={true} title="오코완 사용법 가이드">
        <GuideSection />
      </AccordionSection>
      <AccordionSection defaultOpen={true} title="레벨 시스템 안내">
        <LevelSystemSection />
      </AccordionSection>
      <AccordionSection defaultOpen={true} title="개발자 습관 관리 팁">
        <TipsSection />
      </AccordionSection>
      <AccordionSection defaultOpen={true} title="자주 묻는 질문(FAQ)">
        <FAQSection />
      </AccordionSection>
    </>
  );
}
