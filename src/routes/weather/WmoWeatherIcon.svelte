<script>
    const wmoCodes = [
        { codes: [0], description: "Clear sky", images: ["sun"] },
        {
            codes: [1, 2, 3],
            description: "Mainly clear, partly cloudy, and overcast",
            images: ["mainlyClear", "partlyCloudy", "overcast"],
        },
        {
            codes: [45, 48],
            description: "Fog and depositing rime fog",
            images: ["fog"],
        },
        {
            codes: [51, 53, 55],
            description: "Drizzle: Light, moderate, and dense intensity",
            images: ["drizzle"],
        },
        {
            codes: [56, 57],
            description: "Freezing Drizzle: Light and dense intensity",
            images: ["freezingDrizzle"],
        },
        {
            codes: [61, 63, 65],
            description: "Rain: Slight, moderate and heavy intensity",
            images: ["rain"],
        },
        {
            codes: [66, 67],
            description: "Freezing Rain: Light and heavy intensity",
            images: ["freezingRain"],
        },
        {
            codes: [71, 73, 75],
            description: "Snow fall: Slight, moderate, and heavy intensity",
            images: ["snow"],
        },
        { codes: [77], description: "Snow grains", images: ["snow"] },
        {
            codes: [80, 81, 82],
            description: "Rain showers: Slight, moderate, and violent",
            images: ["rain"],
        },
        {
            codes: [85, 86],
            description: "Snow showers slight and heavy",
            images: ["snow"],
        },
        {
            codes: [95],
            description: "Thunderstorm: Slight or moderate",
            images: ["thunderstorm"],
        },
        {
            codes: [96, 99],
            description: "Thunderstorm with slight and heavy hail",
            images: ["thunderstorm"],
        },
    ];

    // https://github.com/roe-dl/weathericons?tab=readme-ov-file
    /** @type { {[key:string]:string} }*/
    const icons = {
        sun: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><g stroke="#f6bc68"><circle cx="0" cy="0" r="18" fill="#f6bc68" /><path d="M 24.0,0.0 L 38.0,0.0 M 16.97056274847714,16.97056274847714 L 26.87005768508881,26.8700576850888 M 0.0,24.0 L 0.0,38.0 M -16.97056274847714,16.97056274847714 L -26.8700576850888,26.87005768508881 M -24.0,0.0 L -38.0,0.0 M -16.97056274847714,-16.97056274847714 L -26.87005768508881,-26.8700576850888 M -0.0,-24.0 L -1e-14,-38.0 M 16.97056274847714,-16.97056274847714 L 26.8700576850888,-26.87005768508881 " /></g></g></svg>`,
        mainlyClear: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><g stroke="#f6bc68"><circle cx="0" cy="-7" r="18" fill="#f6bc68" /><path fill="none" d="M 17.4069956,-2.4178057400000004 A 18,18 0 1 0 -5.26007294,10.21428571 M 24.0,-7.0 L 38.0,-7.0 M -16.97056274847714,9.970562748477139 L -26.8700576850888,19.87005768508881 M -24.0,-7.0 L -38.0,-7.0 M -16.97056274847714,-23.97056274847714 L -26.87005768508881,-33.870057685088796 M 0.0,-31.0 L -1e-14,-45.0 M 16.97056274847714,-23.97056274847714 L 26.8700576850888,-33.87005768508881 " /></g><path stroke="#828487" stroke-width="1.8" fill="#A2A4A7" d="M 0,33 a 12,12 0 1 1 2.92816105,-23.63726226 a 14.4,14.4 0 0 1 25.92035627,-5.69450347 a 9.75,9.75 0 0 1 10.15148268,5.93176573 a 12,12 0 0 1 -3.7469988,23.4 z " /></g></svg>`,
        partlyCloudy: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><g stroke="#f6bc68"><circle cx="-32" cy="-18" r="14" fill="#f6bc68" /><path fill="none" d="M -18.00252351,-17.73419552 A 14,14 0 1 0 -39.25615559,-6.02718888 M -45.4350288425444,-4.5649711574556004 L -53.21320343559642,3.21320343559643 M -51.0,-18.0 L -62.0,-18.0 M -45.43502884254441,-31.435028842544398 L -53.21320343559643,-39.21320343559642 M -32.0,-37.0 L -32.00000000000001,-48.0 M -18.564971157455602,-31.435028842544412 L -10.78679656440358,-39.21320343559643 " /></g><path stroke="#828487" fill="#828487" d="M -25,28 a 20,20 0 1 1 4.88026841,-39.3954371 a 24,24 0 0 1 43.20059379,-9.49083912 a 16.25,16.25 0 0 1 16.9191378,9.88627622 a 20,20 0 0 1 -6.244998,39z" /></g></svg>`,
        overcast: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><path stroke="#828487" stroke-width="1.8" fill="#A2A4A7" d="M 10,-10 a 12,12 0 1 1 2.92816105,-23.63726226 a 14.4,14.4 0 0 1 25.92035627,-5.69450347 a 9.75,9.75 0 0 1 10.15148268,5.93176573 a 12,12 0 0 1 -3.7469988,23.4 z " /><path stroke="#828487" fill="#828487" d="M -31,28 a 20,20 0 1 1 4.88026841,-39.3954371 a 24,24 0 0 1 43.20059379,-9.49083912 a 16.25,16.25 0 0 1 16.9191378,9.88627622 a 20,20 0 0 1 -6.244998,39z" /></g></svg>`,
        fog: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><path stroke="rgba(111,155,164,90)" stroke-linecap="round" d="M -39,-15 h 78 M -39,-5 h 78 M -39,5 h 78 M -39,15 h 78 " /></g></svg>`,
        drizzle: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><path stroke="#828487" fill="#828487" d="M -26.349999999999998,8.5 a17.0,17.0 0 1 1 4.1482281485,-33.486121535 a20.4,20.4 0 0 1 36.7205047215,-8.067213252 a13.8125,13.8125 0 0 1 14.381267130000001,8.403334786999999 a17.0,17.0 0 0 1 -5.3082483,33.15 z" /><path stroke="#66a1ba" fille="none" stroke-dasharray="4 9" stroke-width="2" d="M3.5,40 l-22.0,-30 m7.5,0 l22.0,30 m7.5,0 l-22.0,-30 m7.5,0 l22.0,30 m7.5,0 l-22.0,-30 " /></g></svg>`,
        freezingDrizzle: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><path stroke="#828487" fill="#828487" d="M -26.349999999999998,4 a17.0,17.0 0 1 1 4.1482281485,-33.486121535 a20.4,20.4 0 0 1 36.7205047215,-8.067213252 a13.8125,13.8125 0 0 1 14.381267130000001,8.403334786999999 a17.0,17.0 0 0 1 -5.3082483,33.15 z" /><path stroke="#66a1ba" fille="none" stroke-dasharray="3.5 7.5" stroke-width="2" d="M-6.800000000000001,18.5 l-18.7,-25.5 m7.5,0 l18.7,25.5 m7.5,0 l-18.7,-25.5 m7.5,0 l18.7,25.5 m7.5,0 l-18.7,-25.5 " /><path stroke="none" fill="#000000" d="M-9.42235138,48 l8.54455967,-4.047423 a6.04100450,6.04100450 0 0 0 2.54603347,-8.64621208 l-3.23725145,-5.21347156 a2.74580363,2.74580363 0 0 1 0.78256116,-3.71485342 l4.93895246,-3.37803994 h-1.38888889 l-5.10795449,2.93585208 a4.68254091,4.68254091 0 0 0 -2.09563466,5.5796135 l2.27226862,6.62156404 a3.29583971,3.29583971 0 0 1 -1.84474537,4.10998876 l-13.74323385,5.75298161 z m33.33333333,0 l1.22771241,-1.22771241 a6.20359314,6.20359314 0 0 0 -1.28480621,-9.75907203 l-13.55967183,-7.82868018 a3.22628070,3.22628070 0 0 1 -1.41857181,-3.89749403 l0.83241498,-2.28704135 h-1.38888889 l-0.68119443,1.08342259 a4.68254091,4.68254091 0 0 0 1.30173924,6.30605466 l12.49300857,8.59055233 a2.68888799,2.68888799 0 0 1 0.13365758,4.33313596 l-5.98873292,4.68683446 z" /><path stroke="#66a1ba" stroke-width="1.2" stroke-linecap="round" fill="none" d="M -17,26 l0.0,16.0 m-6.92820323,-12.0 l13.85640646,8.0 m-13.85640646,-0.0 l13.85640646,-8.0 m-6.92820323,-4.0 m2.30940108,1.33333333 l-2.30940108,1.33333333 l-2.30940108,-1.33333333 m2.30940108,-1.33333333 m-6.92820323,4.0 m2.30940108,-1.33333333 l-0.0,2.66666667 l-2.30940108,1.33333333 m0.0,-2.66666667 m-0.0,8.0 m0.0,-2.66666667 l2.30940108,1.33333333 l0.0,2.66666667 m-2.30940108,-1.33333333 m6.92820323,4.0 m-2.30940108,-1.33333333 l2.30940108,-1.33333333 l2.30940108,1.33333333 m-2.30940108,1.33333333 m6.92820323,-4.0 m-2.30940108,1.33333333 l0.0,-2.66666667 l2.30940108,-1.33333333 m-0.0,2.66666667 m0.0,-8.0 m-0.0,2.66666667 l-2.30940108,-1.33333333 l-0.0,-2.66666667 m2.30940108,1.33333333 " /></g></svg>`,
        rain: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><path stroke="#828487" fill="#828487" d="M -26.349999999999998,8.5 a17.0,17.0 0 1 1 4.1482281485,-33.486121535 a20.4,20.4 0 0 1 36.7205047215,-8.067213252 a13.8125,13.8125 0 0 1 14.381267130000001,8.403334786999999 a17.0,17.0 0 0 1 -5.3082483,33.15 z" /><path stroke="none" fill="#66a1ba" d="M -20,10 h5 l22.0,30 h-5 l-22.0,-30 z m 15,0 h5 l22.0,30 h-5 l-22.0,-30 z m 15,0 h5 l22.0,30 h-5 l-22.0,-30 z " /></g></svg>`,
        freezingRain: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><path stroke="#828487" fill="#828487" d="M -26.349999999999998,4 a17.0,17.0 0 1 1 4.1482281485,-33.486121535 a20.4,20.4 0 0 1 36.7205047215,-8.067213252 a13.8125,13.8125 0 0 1 14.381267130000001,8.403334786999999 a17.0,17.0 0 0 1 -5.3082483,33.15 z" /><path stroke="none" fill="#66a1ba" d="M -27,-7 h5 l18.7,25.5 h-5 l-18.7,-25.5 z m 15,0 h5 l18.7,25.5 h-5 l-18.7,-25.5 z m 15,0 h5 l18.7,25.5 h-5 l-18.7,-25.5 z " /><path stroke="none" fill="#000000" d="M-9.42235138,48 l8.54455967,-4.047423 a6.04100450,6.04100450 0 0 0 2.54603347,-8.64621208 l-3.23725145,-5.21347156 a2.74580363,2.74580363 0 0 1 0.78256116,-3.71485342 l4.93895246,-3.37803994 h-1.38888889 l-5.10795449,2.93585208 a4.68254091,4.68254091 0 0 0 -2.09563466,5.5796135 l2.27226862,6.62156404 a3.29583971,3.29583971 0 0 1 -1.84474537,4.10998876 l-13.74323385,5.75298161 z m33.33333333,0 l1.22771241,-1.22771241 a6.20359314,6.20359314 0 0 0 -1.28480621,-9.75907203 l-13.55967183,-7.82868018 a3.22628070,3.22628070 0 0 1 -1.41857181,-3.89749403 l0.83241498,-2.28704135 h-1.38888889 l-0.68119443,1.08342259 a4.68254091,4.68254091 0 0 0 1.30173924,6.30605466 l12.49300857,8.59055233 a2.68888799,2.68888799 0 0 1 0.13365758,4.33313596 l-5.98873292,4.68683446 z" /><path stroke="#66a1ba" stroke-width="1.2" stroke-linecap="round" fill="none" d="M -17,26 l0.0,16.0 m-6.92820323,-12.0 l13.85640646,8.0 m-13.85640646,-0.0 l13.85640646,-8.0 m-6.92820323,-4.0 m2.30940108,1.33333333 l-2.30940108,1.33333333 l-2.30940108,-1.33333333 m2.30940108,-1.33333333 m-6.92820323,4.0 m2.30940108,-1.33333333 l-0.0,2.66666667 l-2.30940108,1.33333333 m0.0,-2.66666667 m-0.0,8.0 m0.0,-2.66666667 l2.30940108,1.33333333 l0.0,2.66666667 m-2.30940108,-1.33333333 m6.92820323,4.0 m-2.30940108,-1.33333333 l2.30940108,-1.33333333 l2.30940108,1.33333333 m-2.30940108,1.33333333 m6.92820323,-4.0 m-2.30940108,1.33333333 l0.0,-2.66666667 l2.30940108,-1.33333333 m-0.0,2.66666667 m0.0,-8.0 m-0.0,2.66666667 l-2.30940108,-1.33333333 l-0.0,-2.66666667 m2.30940108,1.33333333 " /></g></svg>`,
        snow: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><path stroke="#828487" fill="#828487" d="M -26.349999999999998,8.5 a17.0,17.0 0 1 1 4.1482281485,-33.486121535 a20.4,20.4 0 0 1 36.7205047215,-8.067213252 a13.8125,13.8125 0 0 1 14.381267130000001,8.403334786999999 a17.0,17.0 0 0 1 -5.3082483,33.15 z" /><path stroke="#66a1ba" stroke-width="1.5" stroke-linecap="round" fill="none" d="M -13,7 l0.0,20.0 m-8.66025404,-15.0 l17.32050808,10.0 m-17.32050808,-0.0 l17.32050808,-10.0 m-8.66025404,-5.0 m2.88675135,1.66666667 l-2.88675135,1.66666667 l-2.88675135,-1.66666667 m2.88675135,-1.66666667 m-8.66025404,5.0 m2.88675135,-1.66666667 l-0.0,3.33333333 l-2.88675135,1.66666667 m0.0,-3.33333333 m-0.0,10.0 m0.0,-3.33333333 l2.88675135,1.66666667 l0.0,3.33333333 m-2.88675135,-1.66666667 m8.66025404,5.0 m-2.88675135,-1.66666667 l2.88675135,-1.66666667 l2.88675135,1.66666667 m-2.88675135,1.66666667 m8.66025404,-5.0 m-2.88675135,1.66666667 l0.0,-3.33333333 l2.88675135,-1.66666667 m-0.0,3.33333333 m0.0,-10.0 m-0.0,3.33333333 l-2.88675135,-1.66666667 l-0.0,-3.33333333 m2.88675135,1.66666667 " /><path stroke="#66a1ba" stroke-width="1.5" stroke-linecap="round" fill="none" d="M 12,0 l0.0,20.0 m-8.66025404,-15.0 l17.32050808,10.0 m-17.32050808,-0.0 l17.32050808,-10.0 m-8.66025404,-5.0 m2.88675135,1.66666667 l-2.88675135,1.66666667 l-2.88675135,-1.66666667 m2.88675135,-1.66666667 m-8.66025404,5.0 m2.88675135,-1.66666667 l-0.0,3.33333333 l-2.88675135,1.66666667 m0.0,-3.33333333 m-0.0,10.0 m0.0,-3.33333333 l2.88675135,1.66666667 l0.0,3.33333333 m-2.88675135,-1.66666667 m8.66025404,5.0 m-2.88675135,-1.66666667 l2.88675135,-1.66666667 l2.88675135,1.66666667 m-2.88675135,1.66666667 m8.66025404,-5.0 m-2.88675135,1.66666667 l0.0,-3.33333333 l2.88675135,-1.66666667 m-0.0,3.33333333 m0.0,-10.0 m-0.0,3.33333333 l-2.88675135,-1.66666667 l-0.0,-3.33333333 m2.88675135,1.66666667 " /><path stroke="#66a1ba" stroke-width="1.5" stroke-linecap="round" fill="none" d="M 5,23 l0.0,20.0 m-8.66025404,-15.0 l17.32050808,10.0 m-17.32050808,-0.0 l17.32050808,-10.0 m-8.66025404,-5.0 m2.88675135,1.66666667 l-2.88675135,1.66666667 l-2.88675135,-1.66666667 m2.88675135,-1.66666667 m-8.66025404,5.0 m2.88675135,-1.66666667 l-0.0,3.33333333 l-2.88675135,1.66666667 m0.0,-3.33333333 m-0.0,10.0 m0.0,-3.33333333 l2.88675135,1.66666667 l0.0,3.33333333 m-2.88675135,-1.66666667 m8.66025404,5.0 m-2.88675135,-1.66666667 l2.88675135,-1.66666667 l2.88675135,1.66666667 m-2.88675135,1.66666667 m8.66025404,-5.0 m-2.88675135,1.66666667 l0.0,-3.33333333 l2.88675135,-1.66666667 m-0.0,3.33333333 m0.0,-10.0 m-0.0,3.33333333 l-2.88675135,-1.66666667 l-0.0,-3.33333333 m2.88675135,1.66666667 " /></g></svg>`,
        thunderstorm: `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="%width%" height="%height%" viewBox="-64 -50 128 100"><g stroke-width="3"><path stroke="#828487" fill="#828487" d="M -26.349999999999998,8.5 a17.0,17.0 0 1 1 4.1482281485,-33.486121535 a20.4,20.4 0 0 1 36.7205047215,-8.067213252 a13.8125,13.8125 0 0 1 14.381267130000001,8.403334786999999 a17.0,17.0 0 0 1 -5.3082483,33.15 z" /><path stroke-width="2" stroke-linejoin="round" stroke="#f6bc68" fill="#f6bc68" d="M-4,2 l9.12538211,-21.49805304 l-12.39550268,3.32136493 l7.14107222,-16.82331189 h-8.81753557 l-4.1787982,21.49805304 l12.39550268,-3.32136493 z" /><path stroke="none" fill="#66a1ba" d="M -20,10 h5 l22.0,30 h-5 l-22.0,-30 z m 15,0 h5 l22.0,30 h-5 l-22.0,-30 z m 15,0 h5 l22.0,30 h-5 l-22.0,-30 z " /></g></svg>`,
    };

    const fallback = `No image`;

    /** @type {{ code: number, width?:string, height?:string }}*/
    let { code, width='128', height='100' } = $props();

    /** @param {number} code */
    function getIcon(code) {
        const o = wmoCodes.find(v => v.codes.includes(code));
        if (!o) return fallback;

        let imageKeyIndex = o.codes.findIndex(v => v === code);
        if (!o.images[imageKeyIndex]) imageKeyIndex = 0;

        const imageKey = o.images[imageKeyIndex];
        
        return (icons[imageKey] ?? fallback).replace('%width%', ''+width).replace('%height%', ''+height);
    }
</script>

{@html getIcon(code)}
