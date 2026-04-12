module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/app/lib/auth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createToken",
    ()=>createToken,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const SECRET = process.env.AUTH_SECRET || 'dev-fallback-secret-change-in-production';
function createToken(payload) {
    const data = Buffer.from(JSON.stringify({
        ...payload,
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000
    })).toString('base64url');
    const sig = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])('sha256', SECRET).update(data).digest('base64url');
    return `${data}.${sig}`;
}
function verifyToken(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 2) return null;
        const [data, sig] = parts;
        const expectedSig = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])('sha256', SECRET).update(data).digest('base64url');
        const sigBuf = Buffer.from(sig, 'base64url');
        const expectedBuf = Buffer.from(expectedSig, 'base64url');
        if (sigBuf.length !== expectedBuf.length || !(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(sigBuf, expectedBuf)) {
            return null;
        }
        const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
        if (payload.exp < Date.now()) return null;
        return payload;
    } catch  {
        return null;
    }
}
}),
"[project]/app/lib/storage.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readData",
    ()=>readData,
    "writeData",
    ()=>writeData
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/node_modules/mongodb)");
;
let cachedClient = null;
async function getDb() {
    if (!cachedClient) {
        cachedClient = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__["MongoClient"](process.env.MONGODB_URI);
        await cachedClient.connect();
    }
    return cachedClient.db(process.env.MONGODB_DB || 'portfolio');
}
async function readData(key) {
    const db = await getDb();
    const doc = await db.collection('siteData').findOne({
        _key: key
    });
    if (doc) return doc._data ?? null;
    return null;
}
async function writeData(key, data) {
    const db = await getDb();
    await db.collection('siteData').replaceOne({
        _key: key
    }, {
        _key: key,
        _data: data
    }, {
        upsert: true
    });
}
}),
"[project]/app/api/projects/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/auth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/storage.js [app-route] (ecmascript)");
;
;
;
;
async function GET() {
    try {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readData"])('projects');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to read projects data'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const token = cookieStore.get('auth-token')?.value;
        const payload = token ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$auth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token) : null;
        if (!payload) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const data = await request.json();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$storage$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeData"])('projects', data);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to save projects data'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e05fee93._.js.map