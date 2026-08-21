export type Locale = 'pl' | 'en';

export type FeatureBlock = {
	title: string;
	body: string;
};

export type MetricBlock = FeatureBlock & {
	value: string;
};

export type WorkflowStep = FeatureBlock & {
	label: string;
};

export type ComparisonItem = {
	alternative: string;
	limitation: string;
	growclip: string;
};

export type NodePaletteItem = {
	name: string;
	body: string;
};

export type NodePaletteGroup = {
	title: string;
	body: string;
	items: NodePaletteItem[];
};

export type HardwareOption = {
	title: string;
	status: string;
	body: string;
};

export type FaqItem = {
	question: string;
	answer: string;
};

export type MediaSlot = {
	title: string;
	body: string;
	src: string;
	alt: string;
};

export type DemoFlowExample = {
	id: 'climate' | 'nightHumidity' | 'mqttBridge' | 'safetyAlert';
	title: string;
	body: string;
};

export type ProductContent = {
	meta: {
		title: string;
		description: string;
		socialTitle: string;
		socialDescription: string;
	};
	nav: {
		demo: string;
		diagnostics: string;
		capabilities: string;
		hardware: string;
		faq: string;
		contact: string;
		language: string;
		theme: {
			label: string;
			system: string;
			light: string;
			dark: string;
		};
	};
	hero: {
		kicker: string;
		title: string;
		headline: string;
		copy: string;
		availability: string;
		primaryCta: string;
		secondaryCta: string;
		imageSrc: string;
		imageAlt: string;
		stats: MetricBlock[];
		highlights: string[];
	};
	proof: {
		kicker: string;
		title: string;
		copy: string;
		items: FeatureBlock[];
	};
	problem: {
		kicker: string;
		title: string;
		copy: string;
		items: FeatureBlock[];
	};
	comparison: {
		kicker: string;
		title: string;
		copy: string;
		limitationLabel: string;
		growclipLabel: string;
		items: ComparisonItem[];
	};
	workflow: {
		kicker: string;
		title: string;
		copy: string;
		steps: WorkflowStep[];
	};
	demo: {
		kicker: string;
		title: string;
		copy: string;
		loading: string;
		reset: string;
		paletteToggle: string;
		examples: DemoFlowExample[];
		points: NodePaletteGroup[];
	};
	diagnostics: {
		kicker: string;
		title: string;
		copy: string;
		items: FeatureBlock[];
	};
	capabilities: {
		kicker: string;
		title: string;
		copy: string;
		items: FeatureBlock[];
	};
	hardware: {
		kicker: string;
		title: string;
		copy: string;
		baseTitle: string;
		baseItems: string[];
		optionsTitle: string;
		options: HardwareOption[];
		technicalTitle: string;
		technicalBody: string;
		sourceLabel: string;
	};
	beta: {
		kicker: string;
		title: string;
		copy: string;
		primaryCta: string;
		note: string;
		includesTitle: string;
		includes: FeatureBlock[];
		fitTitle: string;
		fit: FeatureBlock[];
		notForTitle: string;
		notFor: FeatureBlock[];
	};
	showcase: {
		kicker: string;
		title: string;
	};
	media: MediaSlot[];
	faq: {
		kicker: string;
		title: string;
		items: FaqItem[];
	};
	footer: {
		tagline: string;
	};
};

export const locales = ['pl', 'en'] as const satisfies readonly Locale[];

export const contactHref = 'mailto:hello@example.com?subject=GrowClip%20growbox%20setup';
export const elecrowHref =
	'https://www.elecrow.com/crowpanel-esp32-2-9-e-paper-hmi-display-with-128-296-resolution-black-white-color-driven-by-spi-interface.html';

const sharedDemoExampleIds = ['climate', 'nightHumidity', 'mqttBridge', 'safetyAlert'] as const;

export const productContent: Record<Locale, ProductContent> = {
	pl: {
		meta: {
			title: 'GrowClip - lokalny wizualny sterownik growboxa',
			description:
				'GrowClip beta: lokalny wizualny sterownik growboxa z Nodeflow, diagnostyką decyzji, MQTT, Telegramem, webhookami, BLE, opcjonalnymi sensorami i e-paper HMI.',
			socialTitle: 'GrowClip - lokalny wizualny sterownik flow',
			socialDescription:
				'Lokalna automatyzacja, która pokazuje wejścia, warunki, akcje i powód każdej decyzji.'
		},
		nav: {
			demo: 'Demo',
			diagnostics: 'Diagnostyka',
			capabilities: 'Możliwości',
			hardware: 'Sprzęt',
			faq: 'FAQ',
			contact: 'Kontakt',
			language: 'Zmień język',
			theme: {
				label: 'Zmień motyw',
				system: 'System',
				light: 'Jasny',
				dark: 'Ciemny'
			}
		},
		hero: {
			kicker: 'Lokalny wizualny sterownik reguł',
			title: 'GrowClip',
			headline: 'Automatyzacja growboxa, która działa lokalnie i pokazuje regułę jako flow',
			copy: 'GrowClip łączy sensory, czas, MQTT, lokalne wyjścia i powiadomienia w jeden czytelny model Input -> Processing -> Output. Reguły wykonują się na urządzeniu, a Automation Timeline i Rule Telemetry pokazują, co uruchomiło akcję, kiedy i dlaczego.',
			availability: 'Limitowana beta · konfiguracja indywidualna · bez publicznej ceny',
			primaryCta: 'Opisz swój growbox',
			secondaryCta: 'Zobacz demo flow',
			imageSrc: '/media/growclip-hero.webp',
			imageAlt:
				'GrowClip jako lokalny sterownik w jasnym growboxie z roślinami, sensorami i e-paper panelem',
			stats: [
				{
					value: 'local-first',
					title: 'Reguły bez chmury',
					body: 'Najważniejsze decyzje wykonują się na ESP32-S3, nie w zewnętrznej usłudze.'
				},
				{
					value: 'visual flow',
					title: 'Mniej zgadywania',
					body: 'Łączysz wejścia, warunki i akcje w flow, który można obejrzeć przed uruchomieniem.'
				},
				{
					value: 'trace ready',
					title: 'Dowód działania',
					body: 'Timeline, telemetria reguł i snapshot systemu pokazują przyczynę decyzji.'
				}
			],
			highlights: [
				'SCD41, DHT22, BME680, SGP30, BLE, GPIO/analog i MQTT Input jako wejścia',
				'Shelly, GPIO output, RF433, MQTT Publish, Telegram oraz Device Webhooks/Discord jako akcje',
				'Hardware RTC, Xiaomi LYWSD03MMC z PVVX i microSD jako opcje odpornej instalacji'
			]
		},
		proof: {
			kicker: 'Efekt dla użytkownika',
			title: 'Jeden panel zamiast kilku aplikacji i domysłów',
			copy: 'GrowClip porządkuje małą instalację w jeden lokalny system: widzisz warunki, reguły, akcje i historię decyzji zamiast skakać między aplikacjami.',
			items: [
				{
					title: 'Wiesz, co działa',
					body: 'Status runtime, czujniki, Shelly, MQTT i alerty są widoczne obok reguł, które z nich korzystają.'
				},
				{
					title: 'Reagujesz szybciej',
					body: 'Ręczne akcje w panelu webowym i e-paper HMI pozwalają przejąć kontrolę bez szukania właściwej aplikacji.'
				},
				{
					title: 'Nie tracisz śladu',
					body: 'Automation Timeline i zapis na microSD pomagają wrócić do zdarzenia po czasie, także gdy internet nie był dostępny.'
				}
			]
		},
		problem: {
			kicker: 'Problem',
			title: 'Mały growbox szybko robi się systemem rozproszonym',
			copy: 'Pomiary są w jednej aplikacji, gniazdka w drugiej, alerty w Telegramie, a proste timery nie widzą kontekstu. GrowClip porządkuje te elementy w lokalny sterownik oparty na warunkach.',
			items: [
				{
					title: 'Zwykły timer nie zna warunków',
					body: 'Wentylator może pracować za często albo za późno, jeśli reguła nie patrzy na CO2, wilgotność, temperaturę i czas naraz.'
				},
				{
					title: 'Chmura nie jest sterownikiem awaryjnym',
					body: 'Internet może pomagać w Telegramie lub NTP, ale bazowa automatyka powinna działać przy urządzeniu.'
				},
				{
					title: 'Brak historii utrudnia diagnozę',
					body: 'Bez śladu decyzji trudno ocenić, czy problemem był sensor, próg, filtr czasu, gniazdko czy sama reguła.'
				}
			]
		},
		comparison: {
			kicker: 'Dlaczego nie zwykły kontroler',
			title:
				'GrowClip nie zastępuje jednej aplikacji. Zastępuje zgadywanie między kilkoma systemami.',
			copy: 'Największa różnica nie polega na kolejnym przełączniku on/off. GrowClip łączy warunki, akcje i ślad decyzji w jednym lokalnym flow, który da się sprawdzić po fakcie.',
			limitationLabel: 'Typowe ograniczenie',
			growclipLabel: 'GrowClip',
			items: [
				{
					alternative: 'Timer albo smart plug',
					limitation:
						'Włącza urządzenie o godzinie, ale nie widzi CO2, VPD, wilgotności, okna czasu i stanu sensora jednocześnie.',
					growclip:
						'Reguła może wymagać kilku warunków naraz i zostawia trace, dlaczego akcja została uruchomiona albo pominięta.'
				},
				{
					alternative: 'Chmurowy grow controller',
					limitation:
						'Jest wygodny zdalnie, ale krytyczna automatyka zależy od konta, usługi albo stabilnego internetu.',
					growclip:
						'Bazowe decyzje wykonują się na ESP32-S3 lokalnie; internet pomaga w Telegramie, NTP lub zdalnym podglądzie.'
				},
				{
					alternative: 'Własne skrypty i broker MQTT',
					limitation:
						'Elastyczne, ale po kilku integracjach trudno pokazać domownikowi albo testerowi, co naprawdę steruje growboxem.',
					growclip:
						'Flow, panel, timeline i ręczne akcje są jedną powierzchnią produktu, a nie zbiorem rozproszonych plików.'
				}
			]
		},
		workflow: {
			kicker: 'Jak to działa',
			title: 'Measure, decide, act, explain',
			copy: 'GrowClip trzyma prosty model IPO: wejścia dają dane, nody przetwarzają je w decyzję, a akcje uruchamiają sprzęt albo powiadomienia. Każdy krok ma sens diagnostyczny.',
			steps: [
				{
					label: '01',
					title: 'Mierz',
					body: 'SCD41, DHT22, BME680, SGP30, DS18B20, BLE, MQTT, GPIO/touchRead(), analog i status systemu trafiają do lokalnego flow.'
				},
				{
					label: '02',
					title: 'Decyduj',
					body: 'Compare, Hysteresis, Math Scale, Formula VPD, Condition Gate, Time Filter i Time Trigger ograniczają fałszywe akcje.'
				},
				{
					label: '03',
					title: 'Działaj',
					body: 'Shelly, GPIO output, RF433, MQTT Publish, Telegram, Device Webhooks, Text to Speech i Tab Flash wykonują reakcję.'
				},
				{
					label: '04',
					title: 'Wyjaśniaj',
					body: 'System Snapshot, Rule Telemetry i Executable Flow pokazują, co trafiło do runtime urządzenia.'
				}
			]
		},
		demo: {
			kicker: 'Interaktywne demo',
			title: 'Zobacz język flow, zanim zapytasz o betę',
			copy: 'Demo działa w przeglądarce i nie łączy się z urządzeniem. Pokazuje język pracy GrowClip: wejście, przetwarzanie, wyjście i diagnostykę. To przykłady ilustracyjne, nie katalog gotowych konfiguracji dla cudzej instalacji.',
			loading: 'Demo ładuje edytor dopiero przy tej sekcji',
			reset: 'Reset demo',
			paletteToggle: 'Pokaż pełną paletę nodów',
			examples: [
				{
					id: sharedDemoExampleIds[0],
					title: 'Wentylacja klimatu',
					body: 'SCD41 mierzy CO2, histereza ogranicza klikanie, Shelly uruchamia wentylator, Telegram zgłasza przekroczenie.'
				},
				{
					id: sharedDemoExampleIds[1],
					title: 'Nocna wilgotność',
					body: 'BLE thermometer i okno czasu sterują RF433 tylko wtedy, gdy warunki naprawdę tego wymagają.'
				},
				{
					id: sharedDemoExampleIds[2],
					title: 'MQTT do akcji',
					body: 'Zewnętrzny sensor MQTT trafia do lokalnego flow, filtr czasu ogranicza akcję, a stan wraca do brokera.'
				},
				{
					id: sharedDemoExampleIds[3],
					title: 'Alert bezpieczeństwa',
					body: 'Przekroczenie CO2 albo offline sensor trafia przez filtr czasu do Telegrama bez dotykania wykonawców.'
				}
			],
			points: [
				{
					title: 'Wejścia',
					body: 'Sygnały, z których flow bierze dane.',
					items: [
						{ name: 'SCD41 / DHT22', body: 'CO2, temperatura i wilgotność dla reguł klimatu.' },
						{ name: 'BME680 / SGP30', body: 'Środowisko, gaz, TVOC i CO2eq jako lokalne wejścia.' },
						{
							name: 'BLE',
							body: 'Termometry, presence i beacon decoder dla bezprzewodowych sygnałów.'
						},
						{
							name: 'GPIO / Analog',
							body: 'Przycisk, krańcówka, touchRead() albo ADC z board profile.'
						},
						{ name: 'MQTT Input', body: 'Exact-topic input z JSON path.' }
					]
				},
				{
					title: 'Warunki',
					body: 'Nody, które zamieniają dane w decyzję.',
					items: [
						{ name: 'Compare', body: 'Porównanie wartości z progiem, np. CO2 > 1200 ppm.' },
						{
							name: 'Hysteresis',
							body: 'Osobne progi ON/OFF, żeby urządzenie nie klikało co chwilę.'
						},
						{ name: 'Math Scale / Formula', body: 'Skalowanie i własne wzory, np. VPD.' },
						{ name: 'Condition Gate', body: 'Łączenie warunków przed wyjściem.' },
						{
							name: 'Time Filter / Trigger',
							body: 'Okna czasu, interwały i zaplanowane zdarzenia.'
						}
					]
				},
				{
					title: 'Akcje',
					body: 'Wyjścia, które wykonują reakcję.',
					items: [
						{ name: 'Shelly / GPIO / RF433', body: 'Lokalne wyjścia dla dobranej instalacji.' },
						{ name: 'MQTT Publish', body: 'Publikacja stanu lub komendy do brokera.' },
						{ name: 'Telegram', body: 'Alert z kontekstem i trace reguły.' },
						{
							name: 'Device Webhooks',
							body: 'Generic JSON albo Discord webhook przez kolejkę urządzenia.'
						},
						{ name: 'Browser Actions', body: 'Text to Speech, Tab Flash i Monitor w panelu.' }
					]
				},
				{
					title: 'Diagnostyka',
					body: 'Nody, które pomagają zaufać automatyce.',
					items: [
						{ name: 'System Snapshot', body: 'Stan pamięci, sensorów, runtime i kolejek.' },
						{ name: 'Rule Telemetry', body: 'Która reguła zadziałała i dlaczego.' },
						{ name: 'Automation Timeline', body: 'Lokalny ślad decyzji i zmian stanu.' },
						{ name: 'Executable Flow', body: 'Payload, który trafi do firmware runtime.' },
						{ name: 'Support Snapshot', body: 'Status funkcji, GPIO, czasu, BLE, MQTT i archiwum.' }
					]
				}
			]
		},
		diagnostics: {
			kicker: 'Diagnostyka',
			title: 'Automatyka, która zostawia ślad',
			copy: 'Commercial-grade sterownik nie może być czarną skrzynką. GrowClip pokazuje decyzję od wejścia, przez warunek, po akcję i pozwala odróżnić dobrą ciszę od brakującego sensora.',
			items: [
				{
					title: 'Automation Timeline',
					body: 'Chronologiczny zapis decyzji: trigger, reguła, stan warunków, action health i ewentualne dropy/truncate.'
				},
				{
					title: 'Rule Telemetry',
					body: 'Na flow widać, który warunek przepuścił akcję, który ją zatrzymał i z jakim trace została wykonana.'
				},
				{
					title: 'System Snapshot',
					body: 'Stan runtime, pamięci, MQTT, BLE, sensorów i kolejek w jednym punkcie obserwacji.'
				},
				{
					title: 'Support bundle surface',
					body: 'Status funkcji, GPIO inventory, czas, BLE RTC, MQTT, Nodeflow export i archiwum dają materiał do diagnozy bez zgadywania.'
				}
			]
		},
		capabilities: {
			kicker: 'Możliwości',
			title: 'Funkcje dobrane pod realny mały growbox',
			copy: 'Najważniejsze nie jest to, ile integracji da się wymienić, tylko czy można z nich zbudować stabilną regułę i później ją zrozumieć.',
			items: [
				{
					title: 'Trzy tryby Wi-Fi',
					body: 'Własna sieć urządzenia, połączenie z routerem albo oba warianty naraz: lokalny panel plus łączność z siecią.'
				},
				{
					title: 'Lokalny MQTT gateway',
					body: 'Exact-topic input z JSON path, MQTT Publish z QoS/retain i lokalna integracja Shelly bez Home Assistanta.'
				},
				{
					title: 'Szeroka warstwa wejść',
					body: 'SCD41, DHT22, BME680, SGP30, DS18B20, BLE Thermometer, BLE Presence, BLE Beacon, GPIO, analog i MQTT Input jako źródła reguł.'
				},
				{
					title: 'E-paper HMI',
					body: 'Status, menu i szybkie akcje ręczne przy urządzeniu, bez konieczności otwierania laptopa.'
				},
				{
					title: 'Telegram worker',
					body: 'Kolejka alertów i komendy /status, /sensors, /nodeflow dla szybkiego podglądu poza panelem.'
				},
				{
					title: 'Device Webhooks',
					body: 'Kolejkowane powiadomienia generic JSON albo Discord z redakcją sekretów w support data.'
				},
				{
					title: 'Odporność czasu',
					body: 'NTP/manual time, hardware RTC jako trusted backup i Xiaomi LYWSD03MMC z PVVX jako zdegradowany backup BLE.'
				},
				{
					title: 'Manual override',
					body: 'Wybrane wyjścia można przełączyć ręcznie, ale nadal widzisz, co automatyka zrobiła przed i po interwencji.'
				},
				{
					title: 'Modułowa instalacja',
					body: 'RF433, DS3231 RTC, SCD41, DS18B20, bateria i obudowa są opcjami, a nie ukrytymi wymaganiami.'
				}
			]
		},
		hardware: {
			kicker: 'Sprzęt',
			title: 'Baza działa samodzielnie, moduły rozszerzają konkretne scenariusze',
			copy: 'Pierwsza beta opiera się na module ESP32-S3 z e-paper HMI i zapasem pamięci na panel webowy oraz runtime Nodeflow. Dodatki dobiera się pod instalację, nie pod katalog funkcji.',
			baseTitle: 'Wariant bazowy',
			baseItems: [
				'ESP32-S3 z Wi-Fi, rekomendowane 8 MB Flash i 8 MB PSRAM',
				'Wbudowany panel webowy, edytor LiteGraph i lokalny runtime Nodeflow',
				'Tryby Wi-Fi: AP, router albo oba naraz',
				'MQTT input/output, Shelly, Telegram, Device Webhooks, GPIO digital/touch/analog i lokalne decyzje',
				'Automation Timeline, Rule Telemetry, System Snapshot i microSD dla historii',
				'E-paper HMI z menu, dashboardem i wybranymi akcjami ręcznymi'
			],
			optionsTitle: 'Opcjonalne moduły',
			options: [
				{ title: 'RF433', status: 'Opcja', body: 'Sterowanie prostymi gniazdkami 433 MHz.' },
				{ title: 'Hardware RTC', status: 'Opcja', body: 'Zaufany backup czasu dla harmonogramów.' },
				{
					title: 'PVVX Xiaomi LYWSD03MMC',
					status: 'Opcja',
					body: 'Zdegradowany backup czasu przez BLE, nie źródło autorytatywne.'
				},
				{ title: 'SCD41', status: 'Opcja', body: 'CO2, temperatura i wilgotność dla klimatu.' },
				{ title: 'DHT22', status: 'Opcja', body: 'Prosty sensor temperatury i wilgotności.' },
				{
					title: 'BME680',
					status: 'Opcja',
					body: 'Temperatura, wilgotność, ciśnienie i gaz bez claimu IAQ.'
				},
				{ title: 'SGP30', status: 'Opcja', body: 'TVOC i CO2eq jako podstawowe wejście lokalne.' },
				{
					title: 'DS18B20',
					status: 'Walidacja',
					body: 'Sonda temperatury wymagająca live testu dla unit.'
				},
				{ title: 'Bateria Li-ion', status: 'Opcja', body: 'Podtrzymanie lub wariant testowy.' },
				{
					title: 'Obudowa',
					status: 'Opcja',
					body: 'Docelowy montaż zamiast modułu deweloperskiego.'
				}
			],
			technicalTitle: 'Baza pierwszej bety',
			technicalBody:
				'Pierwsza seria bazuje na module Elecrow CrowPanel ESP32 2.9" e-paper HMI. Potwierdzona specyfikacja: ESP32-S3-WROOM-1-N8R8, 8 MB Flash, 8 MB PSRAM, 128x296 e-paper, SPI, Wi-Fi, TF Card/BAT.',
			sourceLabel: 'Źródło specyfikacji Elecrow'
		},
		beta: {
			kicker: 'Pierwsza partia',
			title: 'Mała beta dla osób, które chcą realnie testować lokalną automatykę',
			copy: 'Na start GrowClip nie udaje masowego produktu z koszyka. To limitowana seria do instalacji, w których konfiguracja, moduły i obudowa muszą pasować do konkretnego growboxa.',
			primaryCta: 'Zapytaj o beta moduł',
			note: 'Brak publicznej ceny w tej wersji strony. Wycena zależy od modułów opcjonalnych, obudowy i zakresu konfiguracji.',
			includesTitle: 'Co obejmuje beta',
			includes: [
				{
					title: 'Konfiguracja pod instalację',
					body: 'Ustalenie czujników, wyjść, Shelly/MQTT/Telegram/Webhooks i ręcznych akcji przed przygotowaniem modułu.'
				},
				{
					title: 'Lokalny panel i flow',
					body: 'Panel webowy, widoczny model flow, Automation Timeline, Rule Telemetry i System Snapshot.'
				},
				{
					title: 'Ustalone ograniczenia',
					body: 'Jasna lista tego, co działa w danej konfiguracji, co jest opcją, a co zostaje poza pierwszą partią.'
				},
				{
					title: 'Materiał do wsparcia',
					body: 'Eksport Nodeflow i redagowany support bundle dla diagnozy bez zgadywania.'
				}
			],
			fitTitle: 'Dobry kandydat',
			fit: [
				{
					title: 'Masz kilka urządzeń',
					body: 'Sensor, wentylator, światło, nawilżacz albo Shelly działają dziś osobno.'
				},
				{
					title: 'Chcesz lokalnej logiki',
					body: 'Podstawowe decyzje mają działać przy urządzeniu, nawet gdy internet pomaga tylko pobocznie.'
				},
				{
					title: 'Lubisz widzieć przyczynę',
					body: 'Interesuje Cię historia reguł, trace i diagnostyka, a nie tylko przełącznik on/off.'
				}
			],
			notForTitle: 'Nie dla każdego',
			notFor: [
				{
					title: 'Nie jest zamkniętym termostatem',
					body: 'Jeśli nie chcesz edytować flow po instrukcji, lepszy będzie prosty kontroler on/off.'
				},
				{
					title: 'Nie zastępuje wiedzy o uprawie',
					body: 'Automatyka pomaga utrzymać warunki, ale nie obiecuje wyników biologicznych.'
				},
				{
					title: 'Nie jest katalogiem presetów',
					body: 'Przykłady pokazują język systemu, a nie uniwersalne przepisy dla cudzej instalacji.'
				}
			]
		},
		showcase: {
			kicker: 'Powierzchnie produktu',
			title: 'Panel, flow i historia decyzji są częścią produktu'
		},
		media: [
			{
				title: 'Panel webowy',
				body: 'Dashboard, status runtime, ostatnie decyzje i ręczna kontrola w jednym miejscu.',
				src: '/media/panel-mockup.svg',
				alt: 'Mockup panelu webowego GrowClip z klimatem, akcjami i historią decyzji'
			},
			{
				title: 'Flow automatyzacji',
				body: 'Czytelne połączenie wejść, warunków, akcji i diagnostyki przed uruchomieniem na urządzeniu.',
				src: '/media/flow-mockup.svg',
				alt: 'Mockup flow automatyzacji GrowClip dla wentylacji klimatu'
			},
			{
				title: 'Automation Timeline',
				body: 'Ślad decyzji zapisany lokalnie: trigger, reguła, warunek, akcja i trace.',
				src: '/media/timeline-mockup.svg',
				alt: 'Mockup timeline decyzji automatyzacji GrowClip'
			},
			{
				title: 'Automation Archive',
				body: 'Trendy sensorów i decyzji automatyki jako dane do reguł, a nie osobne dashboardy per czujnik.',
				src: '/media/automation-archive-mockup.svg',
				alt: 'Mockup Automation Archive z trendami sensorów i decyzji'
			},
			{
				title: 'Moduł bazowy bety',
				body: 'Zdjęcie modułu e-paper HMI, na którym bazuje pierwsza seria beta. Finalny montaż i obudowa mogą się różnić.',
				src: '/media/crowpanel-beta-module.jpg',
				alt: 'Moduł e-paper HMI używany jako baza pierwszej serii beta GrowClip'
			}
		],
		faq: {
			kicker: 'FAQ',
			title: 'Krótko, bez obietnic ponad stan',
			items: [
				{
					question: 'Czy GrowClip musi być podłączony do routera?',
					answer:
						'Nie zawsze. Może utworzyć własną sieć Wi-Fi, połączyć się z routerem albo działać w obu wariantach naraz. Reguły automatyzacji działają lokalnie; internet jest potrzebny tylko dla usług zewnętrznych, takich jak Telegram albo NTP.'
				},
				{
					question: 'Czy Shelly i MQTT działają bez Home Assistanta?',
					answer:
						'Tak. GrowClip może sterować Shelly lokalnie i używać MQTT szerzej: odbierać dane po topicu i JSON path oraz publikować własny payload.'
				},
				{
					question: 'Czy moduły RF433, RTC, SCD41, DS18B20 i bateria są wymagane?',
					answer:
						'Nie. Baza działa samodzielnie, a moduły są opcjami konkretnej instalacji. DS18B20 wymaga live walidacji dla danego unit, BME680 jest wejściem środowiskowym bez claimu IAQ, a SGP30 jest podstawowym wejściem TVOC/CO2eq bez obietnicy baseline persistence.'
				},
				{
					question: 'Czy historia decyzji wymaga chmury?',
					answer:
						'Nie. Automation Timeline i Rule Telemetry są lokalnym śladem pracy flow. Przy wariancie z microSD historia może być zapisywana na karcie.'
				},
				{
					question: 'Czy demo flow to gotowe presety do użycia?',
					answer:
						'Nie. Demo pokazuje język GrowClip: wybierz wejście, przetwarzanie i wyjście, a potem połącz linie. Realne progi, sensory, wyjścia i wiring muszą pasować do konkretnej instalacji.'
				},
				{
					question: 'Czy Xiaomi thermometer może robić backup czasu?',
					answer:
						'Tak, kompatybilny Xiaomi LYWSD03MMC z firmware PVVX może działać jako zdegradowany backup czasu przez BLE. NTP albo manual time są autorytatywne, a hardware RTC pozostaje preferowanym trusted backup.'
				},
				{
					question: 'Czy GrowClip wysyła alerty do Discorda?',
					answer:
						'Może wysyłać Device Webhooks w formacie generic JSON albo Discord, jeśli webhook jest skonfigurowany dla danego unit. Sekrety webhooków muszą być redagowane w danych supportowych.'
				},
				{
					question: 'Co jeśli czujnik przestanie odpowiadać?',
					answer:
						'Brak odczytu, niski poziom baterii BLE, zanik sygnału albo przekroczenie progu mogą być zdarzeniem do reakcji. Dzięki temu wiesz, czy automatyka milczy, bo warunki są dobre, czy dlatego, że sensor zniknął.'
				}
			]
		},
		footer: {
			tagline: 'GrowClip - lokalna automatyka dla growboxa i małych instalacji.'
		}
	},
	en: {
		meta: {
			title: 'GrowClip - local visual growbox controller',
			description:
				'GrowClip beta: a local visual growbox controller with Nodeflow, decision diagnostics, MQTT, Telegram, webhooks, BLE, optional sensors and e-paper HMI.',
			socialTitle: 'GrowClip - local visual flow controller',
			socialDescription:
				'Local automation that shows inputs, conditions, actions and the reason behind each decision.'
		},
		nav: {
			demo: 'Demo',
			diagnostics: 'Diagnostics',
			capabilities: 'Capabilities',
			hardware: 'Hardware',
			faq: 'FAQ',
			contact: 'Contact',
			language: 'Change language',
			theme: {
				label: 'Change theme',
				system: 'System',
				light: 'Light',
				dark: 'Dark'
			}
		},
		hero: {
			kicker: 'Local visual rule controller',
			title: 'GrowClip',
			headline: 'Local growbox automation that shows the rule as a flow',
			copy: 'GrowClip connects sensors, time, MQTT, local outputs and notifications into one readable Input -> Processing -> Output model. Rules execute on the device, while Automation Timeline and Rule Telemetry show what triggered an action, when and why.',
			availability: 'Limited beta · individual configuration · no public price',
			primaryCta: 'Describe your growbox',
			secondaryCta: 'See the flow demo',
			imageSrc: '/media/growclip-hero.webp',
			imageAlt:
				'GrowClip as a local controller in a bright growbox with plants, sensors and an e-paper panel',
			stats: [
				{
					value: 'local-first',
					title: 'Rules without cloud',
					body: 'Core decisions execute on the ESP32-S3 instead of an external service.'
				},
				{
					value: 'visual flow',
					title: 'Less guesswork',
					body: 'Inputs, conditions and actions are connected in a flow you can inspect before running.'
				},
				{
					value: 'trace ready',
					title: 'Proof of action',
					body: 'Timeline, rule telemetry and system snapshots explain the reason behind a decision.'
				}
			],
			highlights: [
				'SCD41, DHT22, BME680, SGP30, BLE, GPIO/analog and MQTT Input as rule inputs',
				'Shelly, GPIO output, RF433, MQTT Publish, Telegram and Device Webhooks/Discord as actions',
				'Hardware RTC, Xiaomi LYWSD03MMC with PVVX and microSD as resilient-installation options'
			]
		},
		proof: {
			kicker: 'User outcome',
			title: 'One panel instead of several apps and assumptions',
			copy: 'GrowClip organizes a small installation into one local system: conditions, rules, actions and decision history are visible instead of split across apps.',
			items: [
				{
					title: 'Know what is running',
					body: 'Runtime status, sensors, Shelly, MQTT and alerts appear next to the rules that use them.'
				},
				{
					title: 'React faster',
					body: 'Manual actions in the web panel and e-paper HMI let you take control without hunting for the right app.'
				},
				{
					title: 'Keep the trace',
					body: 'Automation Timeline and microSD logging help review an event later, even when internet was unavailable.'
				}
			]
		},
		problem: {
			kicker: 'Problem',
			title: 'A small growbox quickly becomes a distributed system',
			copy: 'Measurements live in one app, sockets in another, alerts in Telegram, and simple timers do not understand context. GrowClip organizes these parts into a local condition-based controller.',
			items: [
				{
					title: 'A plain timer does not know the conditions',
					body: 'A fan can run too often or too late when a rule does not consider CO2, humidity, temperature and time together.'
				},
				{
					title: 'The cloud is not an emergency controller',
					body: 'Internet can help with Telegram or NTP, but core automation should run beside the hardware.'
				},
				{
					title: 'No history makes debugging harder',
					body: 'Without a decision trace, it is hard to tell whether the sensor, threshold, time filter, socket or rule caused the issue.'
				}
			]
		},
		comparison: {
			kicker: 'Why not a normal controller',
			title: 'GrowClip does not replace one app. It replaces guessing between several systems.',
			copy: 'The difference is not another on/off switch. GrowClip connects conditions, actions and decision traces into one local flow that can be reviewed later.',
			limitationLabel: 'Typical limit',
			growclipLabel: 'GrowClip',
			items: [
				{
					alternative: 'Timer or smart plug',
					limitation:
						'It can turn a device on at a time, but it does not see CO2, VPD, humidity, time windows and sensor state together.',
					growclip:
						'A rule can require several conditions at once and leaves a trace explaining why an action ran or was skipped.'
				},
				{
					alternative: 'Cloud grow controller',
					limitation:
						'Convenient remotely, but critical automation depends on an account, service or stable internet.',
					growclip:
						'Core decisions run locally on the ESP32-S3; internet helps with Telegram, NTP or remote viewing.'
				},
				{
					alternative: 'Custom scripts and MQTT broker',
					limitation:
						'Flexible, but after a few integrations it is hard to show another person what really controls the growbox.',
					growclip:
						'Flow, panel, timeline and manual actions are one product surface instead of scattered files.'
				}
			]
		},
		workflow: {
			kicker: 'How it works',
			title: 'Measure, decide, act, explain',
			copy: 'GrowClip keeps a simple IPO model: inputs provide data, processing nodes turn it into a decision, and actions trigger hardware or notifications. Every step is useful for diagnostics.',
			steps: [
				{
					label: '01',
					title: 'Measure',
					body: 'SCD41, DHT22, BME680, SGP30, DS18B20, BLE, MQTT, GPIO/touchRead(), analog and system status enter the local flow.'
				},
				{
					label: '02',
					title: 'Decide',
					body: 'Compare, Hysteresis, Math Scale, VPD Formula, Condition Gate, Time Filter and Time Trigger reduce false actions.'
				},
				{
					label: '03',
					title: 'Act',
					body: 'Shelly, GPIO output, RF433, MQTT Publish, Telegram, Device Webhooks, Text to Speech and Tab Flash react.'
				},
				{
					label: '04',
					title: 'Explain',
					body: 'System Snapshot, Rule Telemetry and Executable Flow show what reached the device runtime.'
				}
			]
		},
		demo: {
			kicker: 'Interactive demo',
			title: 'Inspect the flow language before asking about the beta',
			copy: "The demo runs in the browser and does not connect to a device. It shows the GrowClip language: input, processing, output and diagnostics. These are illustrative examples, not a catalogue of ready-made configurations for someone else's installation.",
			loading: 'The editor loads only when this section is reached',
			reset: 'Reset demo',
			paletteToggle: 'Show the full node palette',
			examples: [
				{
					id: sharedDemoExampleIds[0],
					title: 'Climate ventilation',
					body: 'SCD41 measures CO2, hysteresis avoids chatter, Shelly starts the fan and Telegram reports a threshold breach.'
				},
				{
					id: sharedDemoExampleIds[1],
					title: 'Night humidity',
					body: 'BLE thermometer and a time window drive RF433 only when conditions actually require it.'
				},
				{
					id: sharedDemoExampleIds[2],
					title: 'MQTT to action',
					body: 'An external MQTT sensor enters the local flow, a time filter limits the action and state returns to the broker.'
				},
				{
					id: sharedDemoExampleIds[3],
					title: 'Safety alert',
					body: 'CO2 threshold breach or stale sensor state goes through a time filter to Telegram without touching actuators.'
				}
			],
			points: [
				{
					title: 'Inputs',
					body: 'Signals the flow can use as data.',
					items: [
						{ name: 'SCD41 / DHT22', body: 'CO2, temperature and humidity for climate rules.' },
						{ name: 'BME680 / SGP30', body: 'Environment, gas, TVOC and CO2eq as local inputs.' },
						{
							name: 'BLE',
							body: 'Thermometers, presence and beacon decoder for wireless signals.'
						},
						{
							name: 'GPIO / Analog',
							body: 'A button, limit switch, touchRead() or ADC from the board profile.'
						},
						{ name: 'MQTT Input', body: 'Exact-topic input with JSON path.' }
					]
				},
				{
					title: 'Conditions',
					body: 'Nodes that turn data into a decision.',
					items: [
						{ name: 'Compare', body: 'Compares a value with a threshold, e.g. CO2 > 1200 ppm.' },
						{ name: 'Hysteresis', body: 'Separate ON/OFF thresholds so devices do not chatter.' },
						{
							name: 'Math Scale / Formula',
							body: 'Scaling and custom formulas, such as VPD.'
						},
						{ name: 'Condition Gate', body: 'Combines conditions before the output.' },
						{ name: 'Time Filter / Trigger', body: 'Time windows, intervals and scheduled events.' }
					]
				},
				{
					title: 'Actions',
					body: 'Outputs that perform the reaction.',
					items: [
						{ name: 'Shelly / GPIO / RF433', body: 'Local outputs for the selected installation.' },
						{ name: 'MQTT Publish', body: 'Publishes state or commands to the broker.' },
						{ name: 'Telegram', body: 'Alert with context and rule trace.' },
						{
							name: 'Device Webhooks',
							body: 'Generic JSON or Discord webhook through the device queue.'
						},
						{ name: 'Browser Actions', body: 'Text to Speech, Tab Flash and Monitor in the panel.' }
					]
				},
				{
					title: 'Diagnostics',
					body: 'Nodes that make automation trustworthy.',
					items: [
						{ name: 'System Snapshot', body: 'Memory, sensors, runtime and queue state.' },
						{ name: 'Rule Telemetry', body: 'Which rule acted and why.' },
						{ name: 'Automation Timeline', body: 'Local trace of decisions and state changes.' },
						{ name: 'Executable Flow', body: 'Payload sent to the firmware runtime.' },
						{ name: 'Support Snapshot', body: 'Feature, GPIO, time, BLE, MQTT and archive status.' }
					]
				}
			]
		},
		diagnostics: {
			kicker: 'Diagnostics',
			title: 'Automation that leaves a trace',
			copy: 'A commercial-grade controller cannot be a black box. GrowClip shows the decision from input, through condition, to action and helps separate healthy silence from a missing sensor.',
			items: [
				{
					title: 'Automation Timeline',
					body: 'A chronological decision log: trigger, rule, condition state, action health and dropped/truncated diagnostics.'
				},
				{
					title: 'Rule Telemetry',
					body: 'The flow shows which condition allowed an action, which blocked it and which trace was attached.'
				},
				{
					title: 'System Snapshot',
					body: 'Runtime, memory, MQTT, BLE, sensor and queue state in one observation point.'
				},
				{
					title: 'Support bundle surface',
					body: 'Feature status, GPIO inventory, time, BLE RTC, MQTT, Nodeflow export and archive state give support data without guessing.'
				}
			]
		},
		capabilities: {
			kicker: 'Capabilities',
			title: 'Features chosen for a real small growbox',
			copy: 'The important question is not how many integrations can be listed, but whether they can build a stable rule that remains understandable later.',
			items: [
				{
					title: 'Three Wi-Fi modes',
					body: 'Device-owned network, router connection or both at once: local panel plus network connectivity.'
				},
				{
					title: 'Local MQTT gateway',
					body: 'Exact-topic input with JSON path, MQTT Publish with QoS/retain and local Shelly integration without Home Assistant.'
				},
				{
					title: 'Wide input layer',
					body: 'SCD41, DHT22, BME680, SGP30, DS18B20, BLE Thermometer, BLE Presence, BLE Beacon, GPIO, analog and MQTT Input as rule sources.'
				},
				{
					title: 'E-paper HMI',
					body: 'Status, menu and quick manual actions beside the device without opening a laptop.'
				},
				{
					title: 'Telegram worker',
					body: 'Alert queue and /status, /sensors, /nodeflow commands for quick checks outside the panel.'
				},
				{
					title: 'Device Webhooks',
					body: 'Queued generic JSON or Discord notifications with secret redaction in support data.'
				},
				{
					title: 'Time resilience',
					body: 'NTP/manual time, hardware RTC as trusted backup and Xiaomi LYWSD03MMC with PVVX as degraded BLE backup.'
				},
				{
					title: 'Manual override',
					body: 'Selected outputs can be switched manually while keeping automation context visible.'
				},
				{
					title: 'Modular installation',
					body: 'RF433, DS3231 RTC, SCD41, DS18B20, battery and enclosure are options, not hidden requirements.'
				}
			]
		},
		hardware: {
			kicker: 'Hardware',
			title: 'The base unit works on its own, add-ons cover specific scenarios',
			copy: 'The first beta uses an ESP32-S3 module with e-paper HMI and enough memory headroom for the web panel and Nodeflow runtime. Add-ons are selected for the installation, not for a feature catalogue.',
			baseTitle: 'Base variant',
			baseItems: [
				'ESP32-S3 with Wi-Fi, recommended 8 MB Flash and 8 MB PSRAM',
				'Embedded web panel, LiteGraph editor and local Nodeflow runtime',
				'Wi-Fi modes: AP, router or both at once',
				'MQTT input/output, Shelly, Telegram, Device Webhooks, GPIO digital/touch/analog and local decisions',
				'Automation Timeline, Rule Telemetry, System Snapshot and microSD history',
				'E-paper HMI with menu, dashboard and selected manual actions'
			],
			optionsTitle: 'Optional modules',
			options: [
				{ title: 'RF433', status: 'Option', body: 'Control simple 433 MHz sockets.' },
				{ title: 'Hardware RTC', status: 'Option', body: 'Trusted backup time for schedules.' },
				{
					title: 'PVVX Xiaomi LYWSD03MMC',
					status: 'Option',
					body: 'Degraded BLE time backup, not an authoritative source.'
				},
				{ title: 'SCD41', status: 'Option', body: 'CO2, temperature and humidity for climate.' },
				{ title: 'DHT22', status: 'Option', body: 'Simple temperature and humidity sensor.' },
				{
					title: 'BME680',
					status: 'Option',
					body: 'Temperature, humidity, pressure and gas without an IAQ claim.'
				},
				{ title: 'SGP30', status: 'Option', body: 'TVOC and CO2eq as a basic local input.' },
				{
					title: 'DS18B20',
					status: 'Validate',
					body: 'Temperature probe that needs live validation for the unit.'
				},
				{ title: 'Li-ion battery', status: 'Option', body: 'Backup or test variant.' },
				{
					title: 'Enclosure',
					status: 'Option',
					body: 'Target mounting instead of a development module.'
				}
			],
			technicalTitle: 'First beta base',
			technicalBody:
				'The first run is based on the Elecrow CrowPanel ESP32 2.9" e-paper HMI module. Confirmed specification: ESP32-S3-WROOM-1-N8R8, 8 MB Flash, 8 MB PSRAM, 128x296 e-paper, SPI, Wi-Fi, TF Card/BAT.',
			sourceLabel: 'Elecrow specification source'
		},
		beta: {
			kicker: 'First batch',
			title: 'A small beta for people who want to test local automation in practice',
			copy: 'GrowClip does not pretend to be a mass-market cart item at launch. It is a limited run for installations where configuration, modules and enclosure need to match a specific growbox.',
			primaryCta: 'Ask about the beta module',
			note: 'No public price in this version of the site. Pricing depends on optional modules, enclosure and configuration scope.',
			includesTitle: 'What the beta includes',
			includes: [
				{
					title: 'Installation-specific configuration',
					body: 'Sensors, outputs, Shelly/MQTT/Telegram/Webhooks and manual actions are agreed before the module is prepared.'
				},
				{
					title: 'Local panel and flow',
					body: 'Web panel, visible flow model, Automation Timeline, Rule Telemetry and System Snapshot.'
				},
				{
					title: 'Clear limits',
					body: 'A concrete list of what works in the chosen setup, what is optional and what stays outside the first batch.'
				},
				{
					title: 'Support material',
					body: 'Nodeflow export and a redacted support bundle for diagnosis without guessing.'
				}
			],
			fitTitle: 'Good fit',
			fit: [
				{
					title: 'You have several devices',
					body: 'Sensor, fan, light, humidifier or Shelly currently work separately.'
				},
				{
					title: 'You want local logic',
					body: 'Core decisions should run beside the device, while internet only helps around the edges.'
				},
				{
					title: 'You care about cause',
					body: 'Rule history, traces and diagnostics matter more than a simple on/off switch.'
				}
			],
			notForTitle: 'Not for everyone',
			notFor: [
				{
					title: 'Not a sealed thermostat',
					body: 'If you do not want to edit a flow after the guide, a simple on/off controller is a better fit.'
				},
				{
					title: 'Not a grow knowledge replacement',
					body: 'Automation helps maintain conditions but does not promise biological outcomes.'
				},
				{
					title: 'Not a preset catalogue',
					body: "Examples show the system language, not universal recipes for someone else's installation."
				}
			]
		},
		showcase: {
			kicker: 'Product surfaces',
			title: 'Panel, flow and decision history are part of the product'
		},
		media: [
			{
				title: 'Web panel',
				body: 'Dashboard, runtime status, recent decisions and manual control in one place.',
				src: '/media/panel-mockup.svg',
				alt: 'GrowClip web panel mockup with climate, actions and decision history'
			},
			{
				title: 'Automation flow',
				body: 'Readable connection of inputs, conditions, actions and diagnostics before running on the device.',
				src: '/media/flow-mockup.svg',
				alt: 'GrowClip climate ventilation automation flow mockup'
			},
			{
				title: 'Automation Timeline',
				body: 'Decision trace stored locally: trigger, rule, condition, action and trace.',
				src: '/media/timeline-mockup.svg',
				alt: 'GrowClip automation decision timeline mockup'
			},
			{
				title: 'Automation Archive',
				body: 'Sensor and automation decision trends used as rule context, not separate per-sensor dashboards.',
				src: '/media/automation-archive-mockup.svg',
				alt: 'Automation Archive sensor and decision trend mockup'
			},
			{
				title: 'Beta base module',
				body: 'Photo of the e-paper HMI module used as the first beta base. Final assembly and enclosure may differ.',
				src: '/media/crowpanel-beta-module.jpg',
				alt: 'E-paper HMI module used as the base for the first GrowClip beta run'
			}
		],
		faq: {
			kicker: 'FAQ',
			title: 'Short answers without overpromising',
			items: [
				{
					question: 'Does GrowClip have to connect to a router?',
					answer:
						'Not always. It can create its own Wi-Fi network, connect to a router or run both modes at once. Automation rules run locally; internet is only needed for external services such as Telegram or NTP.'
				},
				{
					question: 'Can Shelly and MQTT work without Home Assistant?',
					answer:
						'Yes. GrowClip can control Shelly locally and use MQTT more broadly: receive data by topic and JSON path, then publish a custom payload.'
				},
				{
					question: 'Are RF433, RTC, SCD41, DS18B20 and battery required?',
					answer:
						'No. The base unit works on its own, while modules are options for a specific installation. DS18B20 needs live validation for the unit, BME680 is an environmental input without an IAQ claim, and SGP30 is a basic TVOC/CO2eq input without a baseline-persistence promise.'
				},
				{
					question: 'Does decision history require the cloud?',
					answer:
						'No. Automation Timeline and Rule Telemetry are local traces of flow execution. With a microSD variant, history can be written to the card.'
				},
				{
					question: 'Are demo flows ready-to-use presets?',
					answer:
						'No. The demo shows the GrowClip language: choose an input, processing and output, then connect the lines. Real thresholds, sensors, outputs and wiring must match the specific installation.'
				},
				{
					question: 'Can a Xiaomi thermometer back up the clock?',
					answer:
						'Yes, a compatible Xiaomi LYWSD03MMC running PVVX firmware can act as a degraded BLE time backup. NTP or manual time are authoritative, while hardware RTC remains the preferred trusted backup.'
				},
				{
					question: 'Can GrowClip send Discord alerts?',
					answer:
						'It can send Device Webhooks as generic JSON or Discord format when the webhook is configured for the unit. Webhook secrets must be redacted from support data.'
				},
				{
					question: 'What if a sensor stops responding?',
					answer:
						'Missing readings, low BLE battery, signal loss or threshold breaches can become events that deserve a reaction. That way you know whether automation is quiet because conditions are good, or because a sensor disappeared.'
				}
			]
		},
		footer: {
			tagline: 'GrowClip - local automation for growboxes and small installations.'
		}
	}
};

export function resolveLocale(value: string | null | undefined): Locale {
	return value === 'en' ? 'en' : 'pl';
}

export function getProductContent(locale: string | null | undefined): ProductContent {
	return productContent[resolveLocale(locale)];
}
