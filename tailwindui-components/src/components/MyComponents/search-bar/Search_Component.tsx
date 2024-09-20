// SearchComponent.tsx

import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import { navigation, NavigationItem } from './navigation';

const flattenNavigation = (navItems: NavigationItem[]): NavigationItem[] => {
    const flatNav: NavigationItem[] = [];

    navItems.forEach((item) => {
        flatNav.push(item);
        if (item.submenu) {
            flatNav.push(...flattenNavigation(item.submenu));
        }
    });

    return flatNav;
};

const highlightText = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? 
        `<span class="bg-yellow-300">${part}</span>` : 
        part
    ).join('');
};

const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState('');
    const [filteredRoutes, setFilteredRoutes] = useState<NavigationItem[]>([]);
    // const router = useRouter();

    useEffect(() => {
        if (query.trim() === '') {
            setFilteredRoutes([]);
        } else {
            const flatNav = flattenNavigation(navigation);
            const filtered = flatNav.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase()) ||
                item.keywords.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredRoutes(filtered);
        }
    }, [query]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleRouteClick = (href: string) => {
        // router.push(href);
        setQuery(''); // Clear search after navigation
        setFilteredRoutes([]); // Clear filtered routes after navigation
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Search routes..."
            />
            {filteredRoutes.length > 0 && (
                <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    {filteredRoutes.map((item) => (
                        <li
                            key={item.href}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleRouteClick(item.href)}
                        >
                            <item.icon className="inline-block w-5 h-5 mr-2" />
                            <div>
                                <span dangerouslySetInnerHTML={{ __html: highlightText(item.name, query) }} />
                                <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: highlightText(item.description, query) }} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchComponent;
