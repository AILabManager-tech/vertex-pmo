import { getTranslations } from "next-intl/server";
import { ContactContent } from "@/components/pages/ContactContent";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://vertex-pmo.vercel.app/${locale}/contact`,
      languages: {
        fr: "https://vertex-pmo.vercel.app/fr/contact",
        en: "https://vertex-pmo.vercel.app/en/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
