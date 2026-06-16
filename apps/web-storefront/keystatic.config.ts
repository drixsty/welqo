import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Articles de Blog",
      slugField: "slug",
      path: "content/posts/*",
      format: { data: "json" },
      schema: {
        slug: fields.text({
          label: "Slug (URL de l'article)",
          validation: { length: { min: 1 } },
        }),
        titleFr: fields.text({
          label: "Titre (FR)",
          validation: { length: { min: 1 } },
        }),
        titleEn: fields.text({
          label: "Titre (EN)",
          validation: { length: { min: 1 } },
        }),
        descriptionFr: fields.text({
          label: "Description SEO (FR)",
          multiline: true,
        }),
        descriptionEn: fields.text({
          label: "Description SEO (EN)",
          multiline: true,
        }),
        category: fields.select({
          label: "Catégorie",
          options: [
            { label: "Rentabilité", value: "Rentabilité" },
            { label: "Guide", value: "Guide" },
            { label: "Stratégie", value: "Stratégie" },
          ],
          defaultValue: "Guide",
        }),
        publishedAt: fields.date({ label: "Date de publication" }),
        updatedAt: fields.date({ label: "Date de mise à jour (Optionnel)" }),
        readingMinutes: fields.number({ label: "Temps de lecture (minutes)" }),
        keywordsFr: fields.array(fields.text({ label: "Mot-clé FR" }), {
          label: "Mots-clés SEO (FR)",
          itemLabel: (props) => props.value,
        }),
        keywordsEn: fields.array(fields.text({ label: "Mot-clé EN" }), {
          label: "Mots-clés SEO (EN)",
          itemLabel: (props) => props.value,
        }),
        coverImage: fields.image({
          label: "Image de couverture (Upload local)",
          directory: "public/images/blog",
          publicPath: "/images/blog",
        }),
        coverImageUrl: fields.text({
          label: "Image de couverture (URL externe - Fallback)",
        }),
        coverImageAltFr: fields.text({ label: "Alt image (FR)" }),
        coverImageAltEn: fields.text({ label: "Alt image (EN)" }),
        contentFr: fields.document({
          label: "Contenu (FR)",
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
        }),
        contentEn: fields.document({
          label: "Contenu (EN)",
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
        }),
      },
    }),
    pages: collection({
      label: "Pages Statiques & Légales",
      slugField: "slug",
      path: "content/pages/*",
      format: { data: "yaml" },
      schema: {
        slug: fields.text({
          label:
            "Slug (ex: mentions-legales, politique-de-confidentialite, politique-de-cookies)",
          validation: { length: { min: 1 } },
        }),
        titleFr: fields.text({ label: "Titre (FR)" }),
        titleEn: fields.text({ label: "Titre (EN)" }),
        descriptionFr: fields.text({ label: "Description SEO (FR)" }),
        descriptionEn: fields.text({ label: "Description SEO (EN)" }),
        updatedAt: fields.date({ label: "Dernière mise à jour" }),
        contentFr: fields.document({
          label: "Contenu (FR)",
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
        }),
        contentEn: fields.document({
          label: "Contenu (EN)",
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
        }),
      },
    }),
  },
});
