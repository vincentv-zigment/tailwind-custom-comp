// navigation.ts

import {
    ChartBarSquareIcon,
    UsersIcon,
    InboxIcon,
    WrenchIcon,
    CurrencyDollarIcon,
    WrenchScrewdriverIcon,
    PhoneIcon,
    ChatBubbleLeftEllipsisIcon,
    LinkIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export interface NavigationItem {
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
        title?: string;
        titleId?: string;
    } & RefAttributes<SVGSVGElement>>;
    description: string;
    keywords: string;
    submenu?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
    { 
        name: "Dashboard", 
        href: "/app/dashboard", 
        icon: ChartBarSquareIcon,
        description: "View your overall dashboard and analytics",
        keywords: "analytics, overview, summary"
    },
    { 
        name: "Team Members", 
        href: "/app/team", 
        icon: UsersIcon,
        description: "Manage your team members and their roles",
        keywords: "team, members, roles, management"
    },
    { 
        name: "Contacts", 
        href: "/app/contacts", 
        icon: InboxIcon,
        description: "Access and manage your contacts",
        keywords: "contacts, address book, communication"
    },
    { 
        name: "Files", 
        href: "/app/files", 
        icon: InboxIcon,
        description: "Browse and manage your files",
        keywords: "files, documents, storage"
    },
    {
        name: "Settings",
        href: "/app/setting/general-settings",
        icon: WrenchIcon,
        description: "Configure your application settings",
        keywords: "settings, configuration, preferences",
        submenu: [
            { 
                name: "Billing", 
                href: "/app/setting/billing", 
                icon: CurrencyDollarIcon,
                description: "Manage your billing and subscriptions",
                keywords: "billing, subscriptions, payments"
            },
            { 
                name: "General Settings", 
                href: "/app/setting/general-settings", 
                icon: WrenchScrewdriverIcon,
                description: "Update your general application settings",
                keywords: "general, settings, preferences"
            },
            { 
                name: "My Comm Channels", 
                href: "/app/setting/my-communication-channels", 
                icon: PhoneIcon,
                description: "Manage your communication channels",
                keywords: "communication, channels, contact methods"
            },
            { 
                name: "My Message Templates", 
                href: "/app/setting/my-templates", 
                icon: ChatBubbleLeftEllipsisIcon,
                description: "Edit your message templates",
                keywords: "message templates, email templates, communication"
            },
            { 
                name: "My Integrations", 
                href: "/app/setting/integrations", 
                icon: LinkIcon,
                description: "View and manage your integrations",
                keywords: "integrations, connections, APIs"
            },
            { 
                name: "API Keys", 
                href: "/app/setting/api-keys", 
                icon: KeyIcon,
                description: "Manage your API keys",
                keywords: "API keys, security, access"
            },
        ],
    },
];
