"use client";

import { useEffect, useState } from "react";

export default function useCounter(target: number, duration = 1200) {

    const [count, setCount] = useState(0);

    useEffect(() => {

        let start = 0;

        let animation: number;

        const step = () => {

            start += target / (duration / 16);

            if (start >= target) {

                setCount(target);

                cancelAnimationFrame(animation);

                return;

            }

            setCount(Math.floor(start));

            animation = requestAnimationFrame(step);

        };

        animation = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animation);

    }, [target, duration]);

    return count;
}