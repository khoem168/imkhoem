import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { featuredProjects } from '@/data/portalData';
import ProjectDetailClient from '@/components/ProjectDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: 'Project Not Found — Heang Chhengkhoem',
    };
  }

  return {
    title: `${project.title.en} (${project.title.kh}) — Flagship Project | Heang Chhengkhoem`,
    description: project.description.en,
    openGraph: {
      title: `${project.title.en} — ${project.subtitle.en}`,
      description: project.description.en,
      type: 'website',
      images: ['/avatar.jpg'],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const otherProjects = featuredProjects.filter((p) => p.id !== slug);

  return (
    <ProjectDetailClient
      project={project}
      otherProjects={otherProjects}
    />
  );
}
