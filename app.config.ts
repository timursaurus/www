export default defineAppConfig({
  alpine: {
    backToTop: {
      icon: 'mdi:arrow-collapse-up',
    },
    title: 'timursaurus',
    description: "Timur's personal internet page.",

    header: {
      logo: {
        alt: 'timursaurus',
      },
      position: 'right', // possible value are : | 'left' | 'center' | 'right'
    },
    footer: {
      credits: {
        enabled: false
      },
      navigation: true, // possible value are : true | false
      alignment: 'center', // possible value are : 'none' | 'left' | 'center' | 'right'
      message: 'Follow me on' // string that will be displayed in the footer (leave empty or delete to disable)
    },
    socials: {
      twitter: 'timursaurus',
      instagram: 'timursaurus',
      linkedin: {
        icon: 'uil:linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/saurus'
      }
    },

  },

})
