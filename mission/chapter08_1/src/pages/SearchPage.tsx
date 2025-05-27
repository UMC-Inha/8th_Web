import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const mockData = [
    'ABBA', 'Adele', 'Aerosmith', 'Arctic Monkeys', 'Beyoncé',
    'Coldplay', 'Drake', 'Eminem', 'Linkin Park', 'Nirvana',
    'Radiohead', 'Rihanna', 'Taylor Swift', 'The Beatles', 'U2'
];

const SearchPage = () => {
    const [input, setInput] = useState('');
    const debouncedInput = useDebounce(input, 500);
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!debouncedInput.trim()) {
        setResults([]);
        return;
        }

        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
        const filtered = mockData.filter((item) =>
            item.toLowerCase().includes(debouncedInput.toLowerCase())
        );
        setResults(filtered);
        setLoading(false);
        }, 300); // optional delay
    }, [debouncedInput]);

    return (
        <div className="min-h-screen bg-black text-white p-6">
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="검색어를 입력하세요..."
            className="w-full p-3 rounded bg-gray-800 text-white mb-4"
        />
        {loading ? (
            <p className="text-gray-400">로딩 중...</p>
        ) : (
            <ul className="space-y-2">
            {results.length > 0 ? (
                results.map((item) => (
                <li key={item} className="p-2 bg-gray-700 rounded">
                    {item}
                </li>
                ))
            ) : (
                <p className="text-gray-500">검색 결과가 없습니다.</p>
            )}
            </ul>
        )}
        </div>
    );
};

export default SearchPage;
