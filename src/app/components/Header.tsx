"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
    IconHome,
    IconMessage,
    IconBriefcase,
    IconCode,
    IconTrophy,
    IconPencil,
    IconArticle,
    IconInfoCircle,
    IconGauge,
} from "@tabler/icons-react";
import { useAuthStore } from "@/store/Auth";

export default function Header() {
    const { session } = useAuthStore();

    const navItems = [
        {
            name: "Home",
            link: "/#Home",
            icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Skills",
            link: "/#skills",
            icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Experience",
            link: "/#experience",
            icon: <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Education",
            link: "/#education",
            icon: <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Achievements",
            link: "/#achievements",
            icon: <IconTrophy className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Projects",
            link: "/#projects",
            icon: <IconArticle className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "About",
            link: "/#about",
            icon: <IconInfoCircle className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Blog",
            link: "/#blog",
            icon: <IconPencil className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Articles",
            link: "/#articles",
            icon: <IconArticle className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
    ];

    if (session) {
        navItems.push({
            name: "Dashboard",
            link: "/dashboard",
            icon: <IconGauge className="h-4 w-4 text-neutral-500 dark:text-white" />,
        });
    }

    return (
        <div className="relative w-full">
            <FloatingNav navItems={navItems} />
        </div>
    );
}