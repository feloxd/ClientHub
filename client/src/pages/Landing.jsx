import { useEffect, useRef, useState } from 'react';
import { animate, spring, stagger } from 'animejs';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck2,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  ClipboardCheck,
  Clock3,
  FileText,
  Gauge,
  Image as ImageIcon,
  Menu,
  MessageSquareText,
  MapPin,
  Pause,
  PhoneCall,
  Play,
  ShieldCheck,
  Snowflake,
  Star,
  ThermometerSun,
  Truck,
  UserRoundCheck,
  UsersRound,
  Wind,
  Wrench,
  X
} from 'lucide-react';
import Brand from '../components/Brand';
import api from '../lib/api';

const copy = {
  en: {
    nav: ['Services', 'Why Seals', 'How it works', 'Property managers', 'Contact'],
    login: 'Client login',
    request: 'Request service',
    call: 'Call 416-732-8025',
    emergency: 'Need urgent HVAC help?',
    learnMore: 'Explore service',
    heroTag: 'Condominium HVAC specialists · Toronto & GTA',
    heroTitle: 'Reliable HVAC service for every suite.',
    heroText: 'Repair, maintenance and installation for condominiums and residential buildings. Clear answers, professional technicians and documented results.',
    heroPrimary: 'Request HVAC service',
    heroSecondary: 'See our services',
    mascotTag: 'Meet the SEALS comfort crew',
    mascotTitle: 'Friendly face. Serious HVAC service.',
    mascotText: 'Our seal represents calm, clear help when your building needs it most.',
    mascotStory: 'From cold and complicated to warm and comfortable.',
    trust: ['Condominium specialists', 'Clear estimates', 'Documented service'],
    introTag: 'Comfort without complications',
    introTitle: 'When the HVAC stops working, you need a clear solution.',
    introText: 'Seals helps property managers and residents diagnose the problem, understand the options and get the work completed—without confusing technical language.',
    introPoints: ['Simple explanations', 'Options before work begins', 'Photos and final reports'],
    servicesTag: 'HVAC services',
    servicesTitle: 'Everything your building needs to stay comfortable.',
    servicesText: 'Specialized service for in-suite systems, fan coils and residential heating and cooling equipment.',
    serviceItems: [
      ['Repair & diagnostics', 'Fast troubleshooting and practical repair options for heating, cooling and ventilation problems.'],
      ['Fan coil service', 'Cleaning, repair and performance care for condominium fan coil units.'],
      ['Preventive maintenance', 'Planned service that helps reduce unexpected breakdowns and extend equipment life.'],
      ['Installation & replacement', 'Professional equipment selection, installation and commissioning for lasting comfort.']
    ],
    quote: 'Need help with an HVAC problem?',
    quoteText: 'Tell us what is happening in everyday words. We will guide you through the next step.',
    teamTag: 'The people behind the service',
    teamTitle: 'Professional in every suite. Clear at every step.',
    teamText: 'Our uniform represents more than a brand. It identifies a team trained to work carefully inside occupied condominiums, communicate with property managers and leave every visit documented.',
    teamCards: [
      ['Technical precision', 'Two-person service when the job requires coordinated diagnosis.'],
      ['Clear communication', 'Straightforward updates for building and property management teams.'],
      ['Respect for every home', 'Organized work areas, protective care and complete evidence.']
    ],
    reputationTag: 'Local presence. Visible accountability.',
    reputationTitle: 'A service company your residents can recognize and trust.',
    reputationText: 'Professional service starts before the technician opens the equipment. Identified personnel, an organized arrival and clear follow-up help property teams know exactly who is working in the building and why.',
    fleetLabel: 'SEALS fleet and team concept',
    fleetNote: 'Presentation media — ready to be replaced with original SEALS field photography before launch.',
    reputationCards: [
      ['Recognizable on arrival', 'Coordinated uniforms and service vehicles create a clear, professional presence at the property.'],
      ['Prepared for occupied buildings', 'Technicians arrive with the right information, tools and respect for residents and common areas.'],
      ['Accountable after the visit', 'Quotes, photos, notes and final reports remain connected to the building account.']
    ],
    reputationProofTag: 'Trust that can be verified',
    reputationProofTitle: 'Real proof will be connected before launch.',
    reputationProofText: 'The final website is prepared to display verified Google feedback, active trade credentials, insurance documents and original team photography supplied by SEALS.',
    reputationProofItems: ['Verified client feedback', 'Credentials and insurance', 'Original team and fleet media'],
    reputationReviewNote: 'Google reviews and ratings will only be shown when connected to the verified SEALS business profile.',
    resultsTag: 'See the Seals standard',
    resultsTitle: 'Real service. Visible proof. Zero guesswork.',
    resultsText: 'See how we work inside occupied condominiums and how every visit becomes a clear, verifiable service record.',
    videoLabel: 'Inside a Seals service visit',
    videoTitle: 'Professional care from arrival to final check.',
    proofLabel: 'Service documentation',
    proofTitle: 'We show what we found and what was completed.',
    before: 'Before service',
    after: 'After service',
    caseTag: 'Fan coil maintenance · Condominium suite',
    caseTitle: 'A result property managers can see.',
    caseText: 'Clear visual evidence helps the building, resident and technician stay aligned—before approval and after completion.',
    resultPoints: ['Photo evidence', 'Plain-language notes', 'Complete portal history'],
    whyTag: 'Why choose Seals',
    whyTitle: 'Professional service you can understand and verify.',
    whyText: 'Every service call is handled with the building, the resident and the equipment in mind. You always know what was found, what was approved and what was completed.',
    whyItems: [
      ['Clear communication', 'We explain the issue in plain language and keep every party informed.'],
      ['Approved work only', 'You see the available options and costs before the technician proceeds.'],
      ['Complete evidence', 'Photos, notes and a final service report document the work.'],
      ['Respectful technicians', 'Organized appointments and professional care inside every suite.']
    ],
    processTag: 'Simple service process',
    processTitle: 'From the first request to the final report.',
    processItems: [
      ['01', 'Request', 'The building reports the suite, problem and priority. Photos are optional.'],
      ['02', 'Review & quote', 'Seals reviews the request and presents the appropriate repair options.'],
      ['03', 'Schedule & service', 'The administrator assigns the appointment and a technician completes the work.'],
      ['04', 'Close & document', 'Evidence, payment status and the final report stay available in the client portal.']
    ],
    portalTag: 'Built for property managers',
    portalTitle: 'One clear view of every suite and service request.',
    portalText: 'Your building account can report problems for multiple apartments, approve quotes, follow appointments and keep a complete HVAC service history.',
    portalList: ['Requests by building and suite', 'Quote approvals', 'Appointments and technician progress', 'Payments, documents and service history'],
    portalDemo: 'Explore the interactive portal',
    portalLogin: 'Access client account',
    trustSectionTag: 'Confidence before access',
    trustSectionTitle: 'A professional process designed for occupied buildings.',
    trustSectionText: 'Seals coordinates with property teams, explains work before approval and keeps service evidence available after every visit.',
    trustCommitments: [
      ['Clear scope', 'Diagnosis and available options are explained in plain language before work begins.'],
      ['Documented visits', 'Service notes, photos and final reports stay organized by building and suite.'],
      ['Controlled access', 'Only authorized accounts can view property records and service documents.']
    ],
    faqTag: 'Common questions',
    faqTitle: 'What property teams want to know before booking.',
    faqs: [
      ['Can one account manage multiple suites?', 'Yes. A building account can create and follow requests for multiple units from one portal.'],
      ['Will we approve the price before service?', 'When a repair requires authorization, the available options and totals are presented before the approved work begins.'],
      ['Who schedules the appointment?', 'The Seals operations team coordinates the appointment and assigns the appropriate technician.'],
      ['How is the completed work documented?', 'The visit can include before-and-after photos, technician notes, observations, payment status and a final report.'],
      ['Where does Seals provide service?', 'The current service area focuses on Toronto, North York and the Greater Toronto Area.']
    ],
    finalTag: 'Responsive condominium service',
    finalTitle: 'Your building’s comfort deserves a better process.',
    finalText: 'Start a service request and let Seals coordinate the diagnosis, approval, appointment and final documentation.',
    contactTag: 'Request service',
    contactTitle: 'Tell us what’s happening.',
    contactText: 'No technical explanation needed. Share the building, suite and problem. Our team will take it from there.',
    fields: ['Name', 'Email', 'Phone', 'Service', 'Building / suite', 'Describe the problem'],
    serviceOptions: ['Select a service', 'HVAC repair', 'Fan coil service', 'Preventive maintenance', 'Installation or replacement'],
    send: 'Send service request',
    sending: 'Sending…',
    success: 'Thank you. Our team will contact you shortly.',
    error: 'We could not send the request. Please try again.',
    footer: 'Condominium HVAC repair, maintenance and installation across Toronto and the GTA.',
    copyright: '© 2026 Seals HVAC Services. All rights reserved.',
    sticky: 'Request service'
  },
  fr: {
    nav: ['Services', 'Pourquoi Seals', 'Fonctionnement', 'Gestionnaires', 'Contact'],
    login: 'Portail client',
    request: 'Demander un service',
    call: 'Appeler le 416-732-8025',
    emergency: 'Besoin d’aide CVCA rapidement?',
    learnMore: 'Explorer le service',
    heroTag: 'Spécialistes CVCA en copropriété · Toronto et RGT',
    heroTitle: 'Un service CVCA fiable pour chaque unité.',
    heroText: 'Réparation, entretien et installation pour copropriétés et immeubles résidentiels. Des réponses claires, des techniciens professionnels et des résultats documentés.',
    heroPrimary: 'Demander un service CVCA',
    heroSecondary: 'Voir nos services',
    mascotTag: 'Découvrez l’équipe confort SEALS',
    mascotTitle: 'Un visage sympathique. Un service CVCA sérieux.',
    mascotText: 'Notre phoque représente une aide calme et claire lorsque votre immeuble en a le plus besoin.',
    mascotStory: 'Du froid et compliqué au confort simple et chaleureux.',
    trust: ['Spécialistes en copropriété', 'Estimations claires', 'Service documenté'],
    introTag: 'Le confort sans complications',
    introTitle: 'Quand le système CVCA tombe en panne, il faut une solution claire.',
    introText: 'Seals aide les gestionnaires et les résidents à comprendre le problème, comparer les options et terminer les travaux, sans jargon technique.',
    introPoints: ['Explications simples', 'Options avant les travaux', 'Photos et rapport final'],
    servicesTag: 'Services CVCA',
    servicesTitle: 'Tout ce qu’il faut pour assurer le confort de votre immeuble.',
    servicesText: 'Service spécialisé pour systèmes d’unité, ventilo-convecteurs et équipements résidentiels de chauffage et climatisation.',
    serviceItems: [
      ['Réparation et diagnostic', 'Diagnostic rapide et solutions pratiques pour les problèmes de chauffage, climatisation et ventilation.'],
      ['Ventilo-convecteurs', 'Nettoyage, réparation et entretien de performance des unités en copropriété.'],
      ['Entretien préventif', 'Un service planifié pour réduire les pannes imprévues et prolonger la vie des équipements.'],
      ['Installation et remplacement', 'Sélection, installation et mise en service professionnelles pour un confort durable.']
    ],
    quote: 'Un problème de chauffage ou climatisation?',
    quoteText: 'Décrivez-nous la situation avec vos propres mots. Nous vous guiderons vers la prochaine étape.',
    teamTag: 'Les personnes derrière le service',
    teamTitle: 'Professionnels dans chaque unité. Clairs à chaque étape.',
    teamText: 'Notre uniforme représente plus qu’une marque. Il identifie une équipe formée pour travailler avec soin dans les copropriétés occupées, communiquer avec les gestionnaires et documenter chaque visite.',
    teamCards: [
      ['Précision technique', 'Un service à deux techniciens lorsque le diagnostic exige une coordination.'],
      ['Communication claire', 'Des mises à jour simples pour les gestionnaires d’immeubles.'],
      ['Respect de chaque domicile', 'Espace protégé, travail organisé et preuves complètes.']
    ],
    reputationTag: 'Présence locale. Responsabilité visible.',
    reputationTitle: 'Une entreprise que les résidents peuvent reconnaître et à laquelle ils peuvent faire confiance.',
    reputationText: 'Le professionnalisme commence avant même l’ouverture de l’équipement. Un personnel identifié, une arrivée organisée et un suivi clair permettent aux gestionnaires de toujours savoir qui intervient dans l’immeuble et pourquoi.',
    fleetLabel: 'Concept d’équipe et de flotte SEALS',
    fleetNote: 'Média de présentation — prêt à être remplacé par les images originales de SEALS avant le lancement.',
    reputationCards: [
      ['Reconnaissable dès l’arrivée', 'Des uniformes et véhicules coordonnés créent une présence claire et professionnelle sur la propriété.'],
      ['Prêt pour les immeubles occupés', 'Les techniciens arrivent avec les informations, les outils et le respect nécessaires pour les résidents.'],
      ['Responsable après la visite', 'Les devis, photos, notes et rapports finaux restent liés au compte de l’immeuble.']
    ],
    reputationProofTag: 'Une confiance vérifiable',
    reputationProofTitle: 'Des preuves réelles seront intégrées avant le lancement.',
    reputationProofText: 'Le site final est prêt à présenter les avis Google vérifiés, les accréditations actives, les documents d’assurance et les photos originales fournies par SEALS.',
    reputationProofItems: ['Avis clients vérifiés', 'Accréditations et assurance', 'Photos originales de l’équipe et de la flotte'],
    reputationReviewNote: 'Les avis et évaluations Google ne seront affichés qu’après connexion au profil d’entreprise SEALS vérifié.',
    resultsTag: 'Découvrez la norme Seals',
    resultsTitle: 'Un vrai service. Des preuves visibles. Aucune incertitude.',
    resultsText: 'Voyez comment nous travaillons dans les copropriétés occupées et comment chaque visite devient un dossier de service clair et vérifiable.',
    videoLabel: 'Au cœur d’une visite Seals',
    videoTitle: 'Un service professionnel de l’arrivée à la vérification finale.',
    proofLabel: 'Documentation du service',
    proofTitle: 'Nous montrons ce que nous avons trouvé et réalisé.',
    before: 'Avant le service',
    after: 'Après le service',
    caseTag: 'Entretien du ventilo-convecteur · Unité en copropriété',
    caseTitle: 'Un résultat visible pour les gestionnaires.',
    caseText: 'Des preuves visuelles claires permettent à l’immeuble, au résident et au technicien de rester alignés avant l’autorisation et après les travaux.',
    resultPoints: ['Preuves photographiques', 'Notes en langage simple', 'Historique complet du portail'],
    whyTag: 'Pourquoi choisir Seals',
    whyTitle: 'Un service professionnel que vous pouvez comprendre et vérifier.',
    whyText: 'Chaque intervention tient compte de l’immeuble, du résident et de l’équipement. Vous savez toujours ce qui a été trouvé, autorisé et réalisé.',
    whyItems: [
      ['Communication claire', 'Nous expliquons le problème simplement et informons toutes les parties.'],
      ['Travaux autorisés', 'Vous voyez les options et les coûts avant le début des travaux.'],
      ['Preuves complètes', 'Photos, notes et rapport final documentent chaque intervention.'],
      ['Techniciens respectueux', 'Rendez-vous organisés et travail professionnel dans chaque unité.']
    ],
    processTag: 'Un processus simple',
    processTitle: 'De la demande initiale au rapport final.',
    processItems: [
      ['01', 'Demande', 'L’immeuble indique l’unité, le problème et la priorité. Les photos sont facultatives.'],
      ['02', 'Analyse et devis', 'Seals analyse la demande et présente les options de réparation appropriées.'],
      ['03', 'Rendez-vous et service', 'L’administrateur planifie la visite et un technicien effectue les travaux.'],
      ['04', 'Clôture et rapport', 'Les preuves, le paiement et le rapport restent accessibles dans le portail.']
    ],
    portalTag: 'Conçu pour les gestionnaires',
    portalTitle: 'Une vue claire de chaque unité et demande de service.',
    portalText: 'Le compte de votre immeuble permet de signaler des problèmes dans plusieurs appartements, d’approuver les devis et de conserver un historique CVCA complet.',
    portalList: ['Demandes par immeuble et unité', 'Approbation des devis', 'Rendez-vous et suivi du technicien', 'Paiements, documents et historique'],
    portalDemo: 'Explorer le portail interactif',
    portalLogin: 'Accéder au compte client',
    trustSectionTag: 'Confiance avant l’accès',
    trustSectionTitle: 'Un processus professionnel conçu pour les immeubles occupés.',
    trustSectionText: 'Seals coordonne avec les gestionnaires, explique les travaux avant l’autorisation et conserve les preuves de chaque visite.',
    trustCommitments: [
      ['Portée claire', 'Le diagnostic et les options sont expliqués simplement avant le début des travaux.'],
      ['Visites documentées', 'Les notes, photos et rapports sont organisés par immeuble et par unité.'],
      ['Accès contrôlé', 'Seuls les comptes autorisés peuvent consulter les dossiers et documents de la propriété.']
    ],
    faqTag: 'Questions fréquentes',
    faqTitle: 'Ce que les gestionnaires veulent savoir avant de réserver.',
    faqs: [
      ['Un compte peut-il gérer plusieurs unités?', 'Oui. Le compte de l’immeuble peut créer et suivre des demandes pour plusieurs unités.'],
      ['Le prix est-il approuvé avant le service?', 'Lorsqu’une réparation exige une autorisation, les options et les totaux sont présentés avant les travaux approuvés.'],
      ['Qui planifie le rendez-vous?', 'L’équipe des opérations Seals coordonne le rendez-vous et assigne le technicien approprié.'],
      ['Comment les travaux sont-ils documentés?', 'La visite peut inclure des photos avant et après, des notes, des observations, le paiement et un rapport final.'],
      ['Où Seals offre-t-elle ses services?', 'La zone actuelle couvre principalement Toronto, North York et la région du Grand Toronto.']
    ],
    finalTag: 'Service réactif en copropriété',
    finalTitle: 'Le confort de votre immeuble mérite un meilleur processus.',
    finalText: 'Créez une demande et laissez Seals coordonner le diagnostic, l’autorisation, le rendez-vous et le rapport final.',
    contactTag: 'Demander un service',
    contactTitle: 'Décrivez-nous la situation.',
    contactText: 'Aucun jargon nécessaire. Indiquez l’immeuble, l’unité et le problème. Notre équipe s’occupe du reste.',
    fields: ['Nom', 'Courriel', 'Téléphone', 'Service', 'Immeuble / unité', 'Décrivez le problème'],
    serviceOptions: ['Choisir un service', 'Réparation CVCA', 'Service de ventilo-convecteur', 'Entretien préventif', 'Installation ou remplacement'],
    send: 'Envoyer la demande',
    sending: 'Envoi…',
    success: 'Merci. Notre équipe communiquera avec vous sous peu.',
    error: 'La demande n’a pas pu être envoyée. Veuillez réessayer.',
    footer: 'Réparation, entretien et installation CVCA pour copropriétés à Toronto et dans la RGT.',
    copyright: '© 2026 Seals HVAC Services. Tous droits réservés.',
    sticky: 'Demander un service'
  }
};

const serviceIcons = [Wrench, Wind, Gauge, ThermometerSun];
const serviceSlugs = ['hvac-repair', 'fan-coil-maintenance', 'preventive-maintenance', 'air-conditioning'];
const whyIcons = [MessageSquareText, ShieldCheck, ImageIcon, UserRoundCheck];
const processIcons = [FileText, ClipboardCheck, CalendarCheck2, CheckCircle2];

function MotionHeading({ children, className = '' }) {
  return (
    <h2 data-anime-heading className={className} aria-label={children}>
      {children.split(' ').map((word, index) => (
        <span aria-hidden="true" className="anime-section-word mr-[.22em] inline-block" key={`${word}-${index}`}>{word}</span>
      ))}
    </h2>
  );
}

function MascotPose({ pose, className = '', label = 'Seals HVAC mascot' }) {
  return (
    <span className={`mascot-pose mascot-pose-${pose} ${className}`} role="img" aria-label={label}>
      <img src="/images/seals-mascot-process-sprite.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
    </span>
  );
}

export default function Landing() {
  const [menu, setMenu] = useState(false);
  const [lang, setLang] = useState('en');
  const [heroPlaying, setHeroPlaying] = useState(true);
  const [sent, setSent] = useState('');
  const [sending, setSending] = useState(false);
  const heroVideoRef = useRef(null);
  const t = copy[lang];

  useEffect(() => {
    document.title = 'Seals HVAC Services | Toronto Condominium HVAC';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', 'Condominium HVAC repair, fan coil maintenance and installation across Toronto and the Greater Toronto Area.');
  }, []);

  const toggleHeroVideo = async () => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      setHeroPlaying(true);
    } else {
      video.pause();
      setHeroPlaying(false);
    }
  };

  const celebrateMascot = () => {
    document.querySelectorAll('.hero-brand-mascot').forEach((mascot, index) => {
      animate(mascot, {
        rotateY: '1turn',
        rotateZ: [0, -5, 4, 0],
        scale: [1, 1.12, 1],
        duration: 900,
        delay: index * 70,
        ease: spring({ bounce: .38, duration: 820 })
      });
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    const elements = [...document.querySelectorAll('[data-reveal]')];
    const animations = [];
    root.classList.add('anime-scroll-ready');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      root.classList.remove('anime-scroll-ready');
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const variant = entry.target.dataset.reveal;
          const delay = Number.parseInt(getComputedStyle(entry.target).getPropertyValue('--reveal-delay'), 10) || 0;
          const motion = {
            opacity: [0, 1],
            duration: variant === 'line' ? 1250 : 900,
            delay,
            ease: variant === 'scale' ? spring({ bounce: .12, duration: 850 }) : 'outExpo'
          };

          if (variant === 'left') motion.x = [-64, 0];
          if (variant === 'right') motion.x = [64, 0];
          if (variant === 'up') motion.y = [52, 0];
          if (variant === 'scale') {
            motion.scale = [.91, 1];
            motion.rotateX = [4, 0];
          }
          if (variant === 'line') motion.scaleX = [0, 1];

          entry.target.classList.add('is-visible');
          animations.push(animate(entry.target, motion));
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.revert());
      root.classList.remove('anime-scroll-ready');
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const progress = document.querySelector('.landing-scroll-progress');
    const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
    let frame;

    const updateScrollMotion = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (progress) progress.style.transform = `scaleX(${scrollProgress})`;

      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const viewportProgress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        const distance = Math.max(-26, Math.min(26, viewportProgress * -24));
        item.style.setProperty('--parallax-y', `${distance}px`);
      });
      frame = undefined;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const animations = [];
    const heroWords = document.querySelectorAll('.anime-hero-word');
    if (heroWords.length) {
      animations.push(animate(heroWords, {
        opacity: { from: 0 },
        y: { from: '1.15em' },
        rotateX: { from: -70 },
        delay: stagger(68, { start: 180 }),
        duration: 950,
        ease: 'outExpo'
      }));
    }

    const groups = [...document.querySelectorAll('[data-anime-stagger]')];
    const groupObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const items = entry.target.querySelectorAll('[data-anime-item]');
        animations.push(animate(items, {
          opacity: [0, 1],
          y: [36, 0],
          scale: [.96, 1],
          delay: stagger(105),
          ease: spring({ bounce: .16, duration: 680 })
        }));
        groupObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .14 });

    groups.forEach((group) => groupObserver.observe(group));

    const headings = [...document.querySelectorAll('[data-anime-heading]')];
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animations.push(animate(entry.target.querySelectorAll('.anime-section-word'), {
          opacity: [0, 1],
          y: ['.9em', 0],
          rotateX: [55, 0],
          delay: stagger(38),
          duration: 820,
          ease: 'outExpo'
        }));
        headingObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .3 });

    headings.forEach((heading) => headingObserver.observe(heading));
    return () => {
      groupObserver.disconnect();
      headingObserver.disconnect();
      animations.forEach((animation) => animation.revert());
    };
  }, [lang]);

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    setSent('');
    const form = event.currentTarget;
    try {
      const response = await api.post('/publico/contacto', Object.fromEntries(new FormData(form)));
      setSent(response.data.message || t.success);
      form.reset();
    } catch {
      setSent(t.error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="overflow-hidden bg-white text-[#092842]">
      <div className="landing-scroll-progress fixed inset-x-0 top-0 z-[100] h-1 origin-left scale-x-0 bg-cyan shadow-[0_0_16px_rgba(69,194,223,.8)]" aria-hidden="true" />
      <header className="site-header-enter absolute inset-x-0 top-0 z-50 border-b border-white/20">
        <div className="container-wide flex h-20 items-center justify-between md:h-24">
          <Brand light compact />
          <nav className="hidden items-center gap-6 text-[11px] font-extrabold uppercase tracking-[.12em] text-white/80 xl:flex">
            {t.nav.map((label, index) => (
              <a key={label} href={['#services', '#why', '#process', '#property', '#contact'][index]} className="nav-link transition hover:text-cyan">{label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="tel:+14167328025" className="inline-flex items-center gap-2 text-xs font-extrabold text-white transition hover:text-cyan"><PhoneCall size={15} />416-732-8025</a>
            <button type="button" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="rounded-full border border-white/30 px-4 py-3 text-xs font-extrabold text-white">
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <Link to="/login" className="rounded-full border border-white/30 px-5 py-3 text-xs font-extrabold text-white transition hover:bg-white hover:text-navy">{t.login}</Link>
            <a href="#contact" className="rounded-full bg-cyan px-5 py-3 text-xs font-extrabold text-navy transition hover:bg-white">{t.request}</a>
          </div>
          <button type="button" onClick={() => setMenu(!menu)} className="rounded-full border border-white/30 p-2.5 text-white md:hidden" aria-label="Menu">
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menu && (
          <div className="border-t border-white/15 bg-[#041b2e]/98 px-5 py-5 text-white backdrop-blur md:hidden">
            <nav className="flex flex-col gap-1">
              {t.nav.map((label, index) => (
                <a key={label} href={['#services', '#why', '#process', '#property', '#contact'][index]} onClick={() => setMenu(false)} className="border-b border-white/10 py-3 text-sm font-bold">{label}</a>
              ))}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="rounded-lg border border-white/25 py-3 text-xs font-bold">{lang === 'en' ? 'Français' : 'English'}</button>
                <Link to="/login" className="rounded-lg bg-white py-3 text-center text-xs font-bold text-navy">{t.login}</Link>
              </div>
              <a href="tel:+14167328025" className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-cyan py-3 text-xs font-extrabold text-navy"><PhoneCall size={15} />{t.call}</a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="relative min-h-[720px] bg-[#041b2e] text-white md:min-h-[820px]">
          <video ref={heroVideoRef} className="hero-media absolute inset-0 h-full w-full object-cover" src="/media/seals-hvac-service-optimized.mp4" poster="/images/seals-mascot-hero-frame.jpg" autoPlay muted loop playsInline preload="metadata" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,20,35,.96)_0%,rgba(2,20,35,.76)_48%,rgba(2,20,35,.25)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.25),transparent_45%,rgba(2,20,35,.72))]" />
          <div className="hero-scan absolute inset-0" aria-hidden="true" />
          <div className="hero-orbit absolute right-[8%] top-[20%] hidden h-72 w-72 rounded-full border border-cyan/20 lg:block" aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_22px_#45c2df]" />
          </div>
          <button type="button" onClick={celebrateMascot} className="hero-mascot-showcase absolute right-[5%] top-[25%] z-10 hidden w-[290px] flex-col items-center xl:flex" aria-label="Animate the Seals HVAC mascot">
            <span className="hero-mascot-halo absolute top-3 h-64 w-64 rounded-full border border-cyan/30 bg-navy/45 backdrop-blur-md" />
            <img src="/images/seals-mascot.png" alt="Official Seals HVAC seal mascot" className="hero-brand-mascot relative z-10 h-64 w-64 object-contain drop-shadow-[0_24px_35px_rgba(0,0,0,.45)]" />
            <span className="relative z-10 -mt-2 rounded-full border border-white/20 bg-[#061d31]/85 px-5 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-cyan backdrop-blur">{t.mascotTag}</span>
          </button>
          <div className="container-wide relative flex min-h-[720px] items-end pb-24 pt-36 md:min-h-[820px] md:items-center md:pb-20 md:pt-32">
            <div className="max-w-[800px]">
              <button type="button" onClick={celebrateMascot} className="hero-enter hero-enter-1 mb-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-navy/45 p-2 pr-4 text-left backdrop-blur xl:hidden" aria-label="Animate the Seals HVAC mascot">
                <img src="/images/seals-mascot.png" alt="Official Seals HVAC seal mascot" className="hero-brand-mascot h-16 w-16 object-contain" />
                <span className="text-[10px] font-extrabold uppercase leading-5 tracking-[.16em] text-cyan">{t.mascotTag}</span>
              </button>
              <p className="hero-enter hero-enter-1 mb-5 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.22em] text-cyan md:text-xs">
                <Snowflake size={17} /> {t.heroTag}
              </p>
              <h1 className="anime-hero-title font-display text-[clamp(2.8rem,7vw,6.6rem)] font-extrabold leading-[.94] tracking-[-.06em]" aria-label={t.heroTitle}>
                {t.heroTitle.split(' ').map((word, index) => <span aria-hidden="true" key={`${lang}-${word}-${index}`} className="anime-hero-word mr-[.22em] inline-block">{word}</span>)}
              </h1>
              <p className="hero-enter hero-enter-3 mt-6 max-w-2xl text-[15px] leading-7 text-white/75 md:text-xl md:leading-9">{t.heroText}</p>
              <div className="hero-enter hero-enter-4 mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="cta-pulse inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-cyan px-7 text-sm font-extrabold text-navy shadow-[0_15px_40px_rgba(69,194,223,.25)] transition hover:-translate-y-0.5 hover:bg-white">
                  {t.heroPrimary} <ArrowRight size={18} />
                </a>
                <a href="#services" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/35 bg-white/5 px-7 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15">
                  {t.heroSecondary} <ChevronRight size={18} />
                </a>
                <a href="tel:+14167328025" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-cyan/40 bg-cyan/10 px-7 text-sm font-extrabold text-cyan backdrop-blur transition hover:bg-cyan hover:text-navy"><PhoneCall size={17} />{t.call}</a>
              </div>
              <div className="hero-enter hero-enter-5 mt-10 grid max-w-2xl gap-3 border-t border-white/20 pt-6 sm:grid-cols-3">
                {t.trust.map((item, index) => <span key={item} className="trust-item flex items-center gap-2 text-xs font-bold text-white/75" style={{ '--item-delay': `${1.1 + index * .15}s` }}><Check size={15} className="text-cyan" />{item}</span>)}
              </div>
            </div>
          </div>
          <div className="location-ribbon absolute bottom-0 right-0 hidden bg-cyan px-8 py-5 text-xs font-extrabold uppercase tracking-[.14em] text-navy lg:block">
            Toronto · North York · GTA
          </div>
          <button type="button" onClick={toggleHeroVideo} className="absolute bottom-7 left-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-navy/55 text-white backdrop-blur transition hover:border-cyan hover:text-cyan md:left-auto md:right-8" aria-label={heroPlaying ? 'Pause background video' : 'Play background video'}>{heroPlaying ? <Pause size={17} /> : <Play size={17} />}</button>
        </section>

        <section className="bg-[#f3f7fa] py-20 md:py-28">
          <div className="container-site">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
              <div data-reveal="left">
                <p className="kicker">{t.introTag}</p>
                <MotionHeading className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] text-navy md:text-6xl">{t.introTitle}</MotionHeading>
              </div>
              <div data-reveal="right">
                <p className="text-base leading-8 text-slate-600 md:text-lg">{t.introText}</p>
                <div className="mt-7 space-y-4">
                  {t.introPoints.map((item, index) => <div key={item} data-reveal="up" style={{ '--reveal-delay': `${index * 90}ms` }} className="flex items-center gap-3 border-b border-slate-200 pb-4 text-sm font-extrabold"><BadgeCheck className="icon-pop text-brand-600" size={20} />{item}</div>)}
                </div>
              </div>
            </div>
            <div data-reveal="up" className="mascot-manifesto relative mt-14 grid overflow-hidden rounded-[30px] bg-navy text-white shadow-[0_30px_80px_rgba(4,27,46,.18)] md:grid-cols-[240px_1fr] md:items-center">
              <button type="button" onClick={celebrateMascot} className="relative flex min-h-[230px] items-center justify-center overflow-hidden bg-cyan/10" aria-label="Animate the Seals HVAC mascot">
                <span className="absolute h-44 w-44 rounded-full bg-cyan/20 blur-2xl" />
                <img src="/images/seals-mascot.png" alt="Seals HVAC official brand mascot" className="hero-brand-mascot relative h-48 w-48 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,.25)]" loading="lazy" />
              </button>
              <div className="p-7 md:p-10">
                <p className="text-[10px] font-extrabold uppercase tracking-[.22em] text-cyan">{t.mascotTag}</p>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-.04em] md:text-5xl">{t.mascotTitle}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">{t.mascotText}</p>
              </div>
            </div>
            <figure data-reveal="scale" className="relative mt-6 overflow-hidden rounded-[30px] border-[6px] border-white bg-navy shadow-[0_28px_70px_rgba(4,27,46,.16)]">
              <img src="/images/seals-hvac-storyboard.jpeg" alt="SEALS HVAC comfort story featuring the official seal mascot in Toronto" className="aspect-[2/1] w-full object-cover" loading="lazy" decoding="async" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/75 to-transparent px-6 pb-6 pt-20 text-white md:px-9 md:pb-8">
                <p className="max-w-2xl font-display text-2xl font-extrabold tracking-[-.03em] md:text-4xl">{t.mascotStory}</p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="services" className="py-20 md:py-28">
          <div className="container-wide">
            <div className="max-w-3xl" data-reveal="up">
              <p className="kicker">{t.servicesTag}</p>
              <MotionHeading className="premium-title mt-5">{t.servicesTitle}</MotionHeading>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">{t.servicesText}</p>
            </div>
            <div data-anime-stagger className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.serviceItems.map(([title, text], index) => {
                const Icon = serviceIcons[index];
                return (
                  <article key={title} data-anime-item className="service-card group flex min-h-[310px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_45px_rgba(8,43,70,.06)] transition duration-500 hover:-translate-y-2 hover:border-brand-500 hover:bg-navy hover:text-white">
                    <div className="flex items-start justify-between">
                      <span className="grid h-13 w-13 place-items-center rounded-xl bg-brand-50 p-3 text-brand-600 group-hover:bg-white/10 group-hover:text-cyan"><Icon size={25} /></span>
                      <span className="relative -mr-1 -mt-3 h-24 w-24 shrink-0">
                        <span
                          className={`service-card-mascot service-card-mascot-${index + 1} absolute right-0 top-0`}
                          aria-hidden="true"
                          style={{ '--mascot-delay': `${index * .32}s` }}
                        >
                          <img
                            src="/images/seals-service-mascots.jpg"
                            alt=""
                            className={`service-mascot-sprite service-mascot-sprite-${index + 1}`}
                            loading="lazy"
                          />
                        </span>
                        <span className="absolute bottom-0 right-1 font-serif text-xl italic text-slate-300 transition group-hover:text-cyan">0{index + 1}</span>
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-extrabold">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-500 group-hover:text-white/65">{text}</p>
                      <Link to={`/services/${serviceSlugs[index]}`} className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 group-hover:text-cyan">{t.learnMore}<ArrowRight size={14} /></Link>
                    </div>
                  </article>
                );
              })}
            </div>
            <div data-reveal="scale" className="quote-banner mt-8 flex min-h-[150px] flex-col items-start justify-between gap-5 overflow-hidden rounded-2xl bg-cyan px-6 py-7 text-navy md:flex-row md:items-center md:px-9 md:pr-8">
              <div className="relative z-10 md:max-w-[56%]"><h3 className="font-display text-xl font-extrabold md:text-2xl">{t.quote}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-navy/70">{t.quoteText}</p></div>
              <button type="button" onClick={celebrateMascot} className="service-mascot-guide absolute bottom-[-26px] right-[180px] z-10 hidden w-36 md:block lg:right-[205px]" aria-label="Animate the Seals HVAC mascot">
                <span className="absolute left-1/2 top-7 h-20 w-20 -translate-x-1/2 rounded-full bg-white/25 blur-xl" />
                <img src="/images/seals-mascot.png" alt="Seals HVAC mascot ready to help" className="hero-brand-mascot relative h-36 w-36 object-contain drop-shadow-[0_12px_20px_rgba(8,43,69,.2)]" loading="lazy" />
              </button>
              <div className="relative z-10 flex w-full items-center justify-between gap-4 md:w-auto">
                <button type="button" onClick={celebrateMascot} className="service-mascot-mobile md:hidden" aria-label="Animate the Seals HVAC mascot">
                  <img src="/images/seals-mascot.png" alt="Seals HVAC mascot ready to help" className="hero-brand-mascot h-20 w-20 object-contain" loading="lazy" />
                </button>
                <a href="#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(8,43,69,.2)] transition hover:-translate-y-0.5 hover:bg-white hover:text-navy">{t.request}<ArrowRight size={16} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-white pb-20 md:pb-28">
          <div className="container-wide">
            <div className="grid gap-10 border-t border-slate-200 pt-20 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div data-reveal="left">
                <p className="kicker">{t.teamTag}</p>
                <MotionHeading className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] text-navy md:text-6xl">{t.teamTitle}</MotionHeading>
              </div>
              <p data-reveal="right" className="max-w-2xl text-base leading-8 text-slate-600 lg:ml-auto lg:text-lg">{t.teamText}</p>
            </div>

            <div className="team-gallery mt-12 grid gap-4 lg:grid-cols-[1.25fr_.75fr] lg:grid-rows-2">
              <figure data-reveal="scale" className="team-photo group relative min-h-[430px] overflow-hidden rounded-[28px] bg-navy lg:row-span-2 lg:min-h-[680px]">
                <img
                  src="/images/seals-team-service.webp"
                  alt="Two Seals HVAC technicians servicing condominium equipment in Toronto"
                  data-parallax
                  className="parallax-media h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041b2e]/90 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-9">
                  <span className="text-[10px] font-extrabold uppercase tracking-[.2em] text-cyan">01</span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">{t.teamCards[0][0]}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/65">{t.teamCards[0][1]}</p>
                </figcaption>
              </figure>

              <figure data-reveal="right" className="team-photo group relative min-h-[320px] overflow-hidden rounded-[28px] bg-navy" style={{ '--reveal-delay': '100ms' }}>
                <img
                  src="/images/seals-client-care.webp"
                  alt="Seals HVAC technician explaining service details to a condominium property manager"
                  data-parallax
                  className="parallax-media h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#041b2e]/80 via-[#041b2e]/10 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 max-w-sm p-6 text-white md:p-8">
                  <span className="text-[10px] font-extrabold uppercase tracking-[.2em] text-cyan">02</span>
                  <h3 className="mt-2 font-display text-xl font-extrabold md:text-2xl">{t.teamCards[1][0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{t.teamCards[1][1]}</p>
                </figcaption>
              </figure>

              <figure data-reveal="right" className="team-photo group relative min-h-[320px] overflow-hidden rounded-[28px] bg-navy" style={{ '--reveal-delay': '180ms' }}>
                <img
                  src="/images/seals-in-suite-service.webp"
                  alt="Seals HVAC technician carefully servicing a fan coil inside a condominium suite"
                  data-parallax
                  className="parallax-media h-full w-full object-cover object-[center_45%]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#041b2e]/85 via-[#041b2e]/20 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 max-w-sm p-6 text-white md:p-8">
                  <span className="text-[10px] font-extrabold uppercase tracking-[.2em] text-cyan">03</span>
                  <h3 className="mt-2 font-display text-xl font-extrabold md:text-2xl">{t.teamCards[2][0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{t.teamCards[2][1]}</p>
                </figcaption>
              </figure>
            </div>

            <div data-reveal="up" className="mt-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-[#f3f7fa] px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
              <div className="flex items-center gap-4">
                <img src="/images/seals-mascot.png" alt="Seals HVAC mascot" className="h-20 w-20 object-contain" loading="lazy" />
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand-600">SEALS HVAC uniform</p>
                  <p className="mt-1 text-sm font-bold text-navy">Recognizable on site. Accountable after every visit.</p>
                </div>
              </div>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-brand-600">{t.request}<ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="fleet-reputation overflow-hidden bg-[#061d31] py-20 text-white md:py-28">
          <div className="container-wide">
            <div className="grid gap-9 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
              <div data-reveal="left">
                <p className="kicker text-cyan">{t.reputationTag}</p>
                <MotionHeading className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] md:text-6xl">{t.reputationTitle}</MotionHeading>
              </div>
              <p data-reveal="right" className="max-w-2xl text-base leading-8 text-white/62 lg:ml-auto lg:text-lg">{t.reputationText}</p>
            </div>

            <figure data-reveal="scale" className="fleet-portrait group relative mt-12 min-h-[430px] overflow-hidden rounded-[30px] border border-white/10 bg-[#0b2a43] shadow-[0_35px_90px_rgba(0,0,0,.28)] md:min-h-[650px]">
              <video
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-1000 group-hover:scale-[1.025]"
                src="/media/seals-hvac-brand-story.mp4"
                poster="/images/seals-team-fleet-concept.png"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="SEALS HVAC branded service vehicle presentation concept"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041725]/95 via-transparent to-[#041725]/10" />
              <button type="button" onClick={celebrateMascot} className="absolute right-5 top-5 z-10 grid h-28 w-28 place-items-center rounded-full border border-white/20 bg-navy/75 p-3 shadow-2xl backdrop-blur md:right-8 md:top-8 md:h-36 md:w-36" aria-label="Animate the Seals HVAC mascot">
                <img src="/images/seals-mascot.png" alt="Official Seals HVAC mascot badge" className="hero-brand-mascot h-full w-full object-contain" loading="lazy" />
              </button>
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-9">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-navy/75 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-cyan backdrop-blur"><UsersRound size={15} />{t.fleetLabel}</span>
                  <p className="mt-3 max-w-2xl text-xs leading-6 text-white/60">{t.fleetNote}</p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-navy"><MapPin size={14} />Toronto & GTA</span>
              </figcaption>
            </figure>

            <div data-anime-stagger className="mt-5 grid gap-4 md:grid-cols-3">
              {t.reputationCards.map(([title, text], index) => {
                const Icon = [Truck, ShieldCheck, ClipboardCheck][index];
                return (
                  <article key={title} data-anime-item className="reputation-mascot-card group rounded-[24px] border border-white/10 bg-white/[.055] p-7 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-cyan/45 hover:bg-white/[.09]">
                    <MascotPose pose={[4, 7, 3][index]} className="reputation-card-seal" label={`${title} Seals mascot`} />
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan/10 text-cyan"><Icon size={22} /></span>
                    <h3 className="mt-7 font-display text-xl font-extrabold">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/55">{text}</p>
                  </article>
                );
              })}
            </div>

            <div data-reveal="up" className="mt-12 grid overflow-hidden rounded-[28px] bg-white text-navy shadow-[0_30px_80px_rgba(0,0,0,.22)] lg:grid-cols-[.78fr_1.22fr]">
              <div className="reputation-score relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-[#eaf8fc] p-7 md:p-10">
                <MascotPose pose={9} className="reputation-proof-seal" label="Seals mascot presenting verified information" />
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-brand-600">{t.reputationProofTag}</p>
                  <div className="mt-7 flex gap-1 text-amber-400" aria-label="Review presentation placeholders">{[0, 1, 2, 3, 4].map((item) => <Star key={item} size={25} fill="currentColor" />)}</div>
                </div>
                <p className="max-w-sm text-xs font-bold leading-6 text-slate-500">{t.reputationReviewNote}</p>
              </div>
              <div className="p-7 md:p-10 lg:p-12">
                <h3 className="font-display text-3xl font-extrabold leading-tight tracking-[-.04em] md:text-5xl">{t.reputationProofTitle}</h3>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">{t.reputationProofText}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {t.reputationProofItems.map((item) => <span key={item} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-extrabold"><BadgeCheck size={17} className="shrink-0 text-brand-600" />{item}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="results-showcase overflow-hidden bg-[#edf4f7] py-20 md:py-28">
          <div className="container-wide">
            <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
              <div data-reveal="left">
                <p className="kicker">{t.resultsTag}</p>
                <MotionHeading className="premium-title mt-5">{t.resultsTitle}</MotionHeading>
              </div>
              <p data-reveal="right" className="max-w-2xl text-base leading-8 text-slate-600 lg:ml-auto lg:text-lg">{t.resultsText}</p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
              <article data-reveal="left" className="media-panel group relative min-h-[430px] overflow-hidden rounded-[30px] bg-navy text-white md:min-h-[600px]">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/media/seals-hvac-service-optimized.mp4"
                  poster="/images/seals-service-proof-v2.webp"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-navy/85 to-transparent" />
                <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 rounded-full border border-white/20 bg-navy/70 px-4 py-2.5 backdrop-blur-md md:left-7 md:top-7">
                  <CirclePlay size={20} className="text-cyan" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[.18em]">{t.videoLabel}</span>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/60 to-transparent p-6 pt-28 md:p-9 md:pt-36">
                  <h3 className="max-w-2xl font-display text-2xl font-extrabold leading-tight md:text-4xl">{t.videoTitle}</h3>
                </div>
              </article>

              <article data-reveal="right" className="media-panel group relative min-h-[430px] overflow-hidden rounded-[30px] bg-navy text-white md:min-h-[600px]">
                <img src="/images/seals-service-proof-v2.webp" alt="Seals HVAC technician documenting a completed condominium service visit" data-parallax className="parallax-media h-full w-full object-cover object-center" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9">
                  <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-cyan"><Camera size={16} />{t.proofLabel}</span>
                  <h3 className="mt-3 max-w-lg font-display text-2xl font-extrabold leading-tight md:text-3xl">{t.proofTitle}</h3>
                </div>
              </article>
            </div>

            <article data-reveal="scale" className="before-after-card mt-5 grid overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_rgba(4,27,46,.12)] xl:grid-cols-[1.35fr_.65fr]">
              <div className="before-after-visual relative min-h-[360px] overflow-hidden bg-slate-200 md:min-h-[540px]">
                <img src="/images/seals-before-after-v2.webp" alt="Before and after professional fan coil maintenance" data-parallax className="parallax-media absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
                <div className="comparison-line absolute bottom-0 left-1/2 top-0 w-px bg-white/80 shadow-[0_0_18px_rgba(255,255,255,.9)]" aria-hidden="true"><span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-cyan text-xs font-black text-navy shadow-xl">↔</span></div>
                <span className="absolute left-4 top-4 rounded-full bg-navy/85 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur md:left-7 md:top-7">{t.before}</span>
                <span className="absolute right-4 top-4 rounded-full bg-cyan px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-navy md:right-7 md:top-7">{t.after}</span>
              </div>
              <div className="flex flex-col justify-center p-7 md:p-12">
                <p className="kicker">{t.caseTag}</p>
                <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-[-.04em] text-navy md:text-5xl">{t.caseTitle}</h3>
                <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">{t.caseText}</p>
                <div className="mt-8 space-y-3">
                  {t.resultPoints.map((item) => <p key={item} className="flex items-center gap-3 border-b border-slate-200 pb-3 text-sm font-extrabold text-navy"><CheckCircle2 size={18} className="text-brand-600" />{item}</p>)}
                </div>
                <a href="#contact" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-brand-600">{t.request}<ArrowRight size={16} /></a>
              </div>
            </article>
          </div>
        </section>

        <section id="why" className="overflow-hidden bg-[#061d31] py-20 text-white md:py-28">
          <div className="container-wide grid gap-14 xl:grid-cols-[.8fr_1.2fr] xl:items-start">
            <div className="xl:sticky xl:top-10" data-reveal="left">
              <p className="kicker text-cyan">{t.whyTag}</p>
              <MotionHeading className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] md:text-6xl">{t.whyTitle}</MotionHeading>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/60">{t.whyText}</p>
            </div>
            <div data-anime-stagger className="grid gap-px overflow-hidden rounded-2xl bg-white/15 sm:grid-cols-2">
              {t.whyItems.map(([title, text], index) => {
                const Icon = whyIcons[index];
                return (
                  <article key={title} data-anime-item className="why-card min-h-[265px] bg-[#0a2740] p-7 md:p-9">
                    <MascotPose pose={index + 1} className={`why-card-seal why-card-seal-${index + 1}`} label={`${title} Seals mascot`} />
                    <Icon className="text-cyan" size={27} />
                    <h3 className="mt-10 font-display text-xl font-extrabold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/55">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" className="bg-[#f2f6f9] py-20 md:py-28">
          <div className="container-wide">
            <div className="text-center" data-reveal="up">
              <p className="kicker justify-center">{t.processTag}</p>
              <MotionHeading className="premium-title mx-auto mt-5 max-w-4xl">{t.processTitle}</MotionHeading>
            </div>
            <div data-anime-stagger className="relative mt-14 grid gap-4 lg:grid-cols-4">
              <div data-reveal="line" className="process-line absolute left-[12%] right-[12%] top-10 hidden h-px origin-left bg-slate-300 lg:block" />
              {t.processItems.map(([number, title, text], index) => {
                const Icon = processIcons[index];
                return (
                  <article key={title} data-anime-item className="process-card relative rounded-2xl border border-slate-200 bg-white p-7 pt-24">
                    <MascotPose pose={index + 5} className={`process-card-seal process-card-seal-${index + 1}`} label={`${title} Seals mascot`} />
                    <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-navy text-cyan shadow-[0_0_0_8px_#f2f6f9]"><Icon size={22} /></span>
                    <span className="mt-8 block text-[10px] font-extrabold uppercase tracking-[.2em] text-brand-600">{number}</span>
                    <h3 className="mt-2 font-display text-xl font-extrabold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="property" className="bg-white py-20 md:py-28">
          <div data-reveal="scale" className="container-wide grid overflow-hidden rounded-[28px] bg-navy lg:grid-cols-[.9fr_1.1fr]">
            <div className="p-7 text-white md:p-12 lg:p-14">
              <p className="kicker text-cyan">{t.portalTag}</p>
              <MotionHeading className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] md:text-5xl">{t.portalTitle}</MotionHeading>
              <p className="mt-6 text-base leading-8 text-white/60">{t.portalText}</p>
              <div className="mt-7 space-y-3">
                {t.portalList.map((item, index) => <p key={item} data-reveal="left" style={{ '--reveal-delay': `${index * 80}ms` }} className="flex items-center gap-3 text-sm font-bold text-white/80"><CheckCircle2 size={18} className="text-cyan" />{item}</p>)}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan px-6 py-3.5 text-sm font-extrabold text-navy">{t.portalDemo}<ArrowRight size={16} /></Link>
                <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold text-white">{t.portalLogin}</Link>
              </div>
            </div>
            <div className="relative min-h-[440px] overflow-hidden bg-[#e8f0f5] p-5 md:p-10">
              <MascotPose pose={9} className="portal-guide-seal" label="Seals mascot presenting the client portal" />
              <div className="portal-preview h-full overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div className="flex items-center gap-3"><Building2 className="text-brand-600" /><div><b className="block text-sm">Residencias ELORA</b><small className="text-slate-400">Building client portal</small></div></div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold text-emerald-700">ACTIVE</span>
                </div>
                <div className="grid gap-3 p-5">
                  {[
                    ['Suite 530 · No cooling', 'Quote ready', 'bg-amber-50 text-amber-700'],
                    ['Suite 214 · Fan coil noise', 'Scheduled', 'bg-blue-50 text-blue-700'],
                    ['Suite 806 · Preventive service', 'Completed', 'bg-emerald-50 text-emerald-700']
                  ].map(([title, status, tone], index) => (
                    <div key={title} className="portal-ticket rounded-xl border border-slate-200 p-4" style={{ '--ticket-delay': `${index * 140}ms` }}>
                      <div className="flex items-start justify-between gap-3"><div><small className="text-slate-400">SHV-10{53 - index}</small><b className="mt-1 block text-sm">{title}</b></div><span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold uppercase ${tone}`}>{status}</span></div>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="portal-progress h-full origin-left rounded-full bg-brand-600" style={{ width: `${80 - index * 25}%`, '--ticket-delay': `${.8 + index * .18}s` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4f8fa] py-20 md:py-28">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
              <div data-reveal="left">
                <p className="kicker">{t.trustSectionTag}</p>
                <MotionHeading className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] text-navy md:text-6xl">{t.trustSectionTitle}</MotionHeading>
              </div>
              <p data-reveal="right" className="max-w-2xl text-base leading-8 text-slate-600 lg:ml-auto lg:text-lg">{t.trustSectionText}</p>
            </div>
            <div data-anime-stagger className="mt-12 grid gap-4 md:grid-cols-3">
              {t.trustCommitments.map(([title, text], index) => {
                const Icon = [ClipboardCheck, FileText, ShieldCheck][index];
                return <article data-anime-item key={title} className="trust-mascot-card relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(7,37,61,.06)]"><MascotPose pose={[1, 3, 9][index]} className="trust-card-seal" label={`${title} Seals mascot`} /><span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600"><Icon size={22} /></span><h3 className="mt-7 max-w-[70%] font-display text-xl font-extrabold text-navy">{title}</h3><p className="mt-3 max-w-[74%] text-sm leading-7 text-slate-500">{text}</p></article>;
              })}
            </div>
            <div className="mt-16 grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
              <div data-reveal="left"><p className="kicker">{t.faqTag}</p><MotionHeading className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-[-.04em] text-navy md:text-5xl">{t.faqTitle}</MotionHeading><a href="tel:+14167328025" className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-extrabold text-white"><PhoneCall size={16} />{t.call}</a></div>
              <div data-reveal="right" className="divide-y divide-slate-200 border-y border-slate-200">
                {t.faqs.map(([question, answer], index) => <details key={question} className="faq-item group py-5" open={index === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-lg font-extrabold text-navy"><span>{question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-brand-600 transition group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-1 pt-4 text-sm leading-7 text-slate-600">{answer}</p></details>)}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-cyan py-16 text-navy md:py-20">
          <Snowflake className="snowflake-drift absolute -right-16 -top-24 h-80 w-80 text-white/20" strokeWidth={1} />
          <div data-reveal="up" className="container-site relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em]">{t.finalTag}</p><MotionHeading className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-[-.04em] md:text-5xl">{t.finalTitle}</MotionHeading><p className="mt-4 max-w-2xl text-sm leading-7 text-navy/70">{t.finalText}</p></div>
            <a href="#contact" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-navy px-7 py-4 text-sm font-extrabold text-white">{t.request}<ArrowRight size={17} /></a>
          </div>
        </section>

        <section id="contact" className="bg-[#041725] py-20 text-white md:py-28">
          <div className="container-wide grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div data-reveal="left">
              <p className="kicker text-cyan">{t.contactTag}</p>
              <MotionHeading className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] md:text-6xl">{t.contactTitle}</MotionHeading>
              <p className="mt-6 max-w-md text-base leading-8 text-white/60">{t.contactText}</p>
              <div className="mt-9 space-y-4 text-sm font-bold text-white/75">
                <a href="tel:+14167328025" className="flex items-center gap-3 text-cyan transition hover:text-white"><PhoneCall size={19} />416-732-8025</a>
                <p className="flex items-center gap-3"><Clock3 size={19} className="text-cyan" /> Toronto & Greater Toronto Area</p>
                <p className="flex items-center gap-3"><ShieldCheck size={19} className="text-cyan" /> Authorized client portal available</p>
              </div>
              <div className="contact-mascot-note mt-10 flex max-w-md items-center gap-4 rounded-[24px] border border-cyan/20 bg-white/[.055] p-4">
                <MascotPose pose={5} className="contact-note-seal" label="Seals mascot taking service notes" />
                <p className="text-sm font-extrabold leading-6 text-white">{lang === 'fr' ? 'Expliquez-nous le problème — notre phoque prend déjà des notes.' : 'Tell us the problem — our seal is already taking notes.'}</p>
              </div>
            </div>
            <form data-reveal="right" onSubmit={submit} className="contact-form-glow relative grid gap-4 overflow-hidden rounded-2xl border border-white/15 bg-white/[.06] p-5 backdrop-blur md:grid-cols-2 md:p-8">
              <MascotPose pose={5} className="contact-form-watermark" label="" />
              <label><span className="dark-label">{t.fields[0]}</span><input className="dark-input" name="nombre" required placeholder={t.fields[0]} /></label>
              <label><span className="dark-label">{t.fields[1]}</span><input className="dark-input" type="email" name="email" required placeholder="name@email.com" /></label>
              <label><span className="dark-label">{t.fields[2]}</span><input className="dark-input" name="telefono" placeholder={t.fields[2]} /></label>
              <label><span className="dark-label">{t.fields[3]}</span><select className="dark-input" name="servicio" required defaultValue="">{t.serviceOptions.map((item, index) => <option key={item} value={index ? item : ''} disabled={!index}>{item}</option>)}</select></label>
              <label className="md:col-span-2"><span className="dark-label">{t.fields[4]}</span><input className="dark-input" name="ubicacion" placeholder={t.fields[4]} /></label>
              <label className="md:col-span-2"><span className="dark-label">{t.fields[5]}</span><textarea className="dark-input min-h-32 resize-y" name="mensaje" required minLength={10} placeholder={t.fields[5]} /></label>
              <div className="flex flex-col items-start justify-between gap-4 md:col-span-2 md:flex-row md:items-center">
                <button disabled={sending} className="inline-flex min-h-13 items-center gap-3 rounded-full bg-cyan px-7 py-3.5 text-sm font-extrabold text-navy transition hover:bg-white disabled:opacity-60">{sending ? t.sending : t.send}<ArrowRight size={16} /></button>
                {sent && <p className="max-w-xs text-xs leading-5 text-cyan">{sent}</p>}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#020e18] pb-24 pt-12 text-white md:pb-12">
        <div className="container-wide flex flex-col justify-between gap-8 border-b border-white/10 pb-9 md:flex-row">
          <div><Brand light /><p className="mt-5 max-w-md text-sm leading-6 text-white/45">{t.footer}</p></div>
          <div className="grid grid-cols-2 gap-12 text-sm text-white/55">
            <div className="space-y-3"><b className="block text-[10px] uppercase tracking-widest text-cyan">Services</b><Link to="/services/hvac-repair" className="block hover:text-white">HVAC repair</Link><Link to="/services/fan-coil-maintenance" className="block hover:text-white">Fan coils</Link><Link to="/services/preventive-maintenance" className="block hover:text-white">Maintenance</Link></div>
            <div className="space-y-3"><b className="block text-[10px] uppercase tracking-widest text-cyan">Access</b><Link to="/login" className="block hover:text-white">{t.login}</Link><Link to="/demo" className="block hover:text-white">Portal demo</Link><Link to="/privacy" className="block hover:text-white">Privacy</Link><Link to="/terms" className="block hover:text-white">Terms</Link></div>
          </div>
        </div>
        <div className="container-wide flex flex-col justify-between gap-2 pt-6 text-[11px] text-white/35 sm:flex-row"><p>{t.copyright}</p><p>Toronto, Ontario · Canada</p></div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_auto_auto] gap-2 border-t border-slate-200 bg-white p-3 shadow-[0_-10px_30px_rgba(4,23,37,.12)] md:hidden">
        <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 text-sm font-extrabold text-white">{t.sticky}<ArrowRight size={16} /></a>
        <a href="tel:+14167328025" className="grid min-h-12 min-w-12 place-items-center rounded-full bg-cyan text-navy" aria-label={t.call}><PhoneCall size={19} /></a>
        <Link to="/login" className="grid min-h-12 min-w-12 place-items-center rounded-full border border-slate-200 text-navy" aria-label={t.login}><Building2 size={19} /></Link>
      </div>
    </div>
  );
}
