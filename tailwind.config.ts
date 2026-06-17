import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{ts,tsx}'], theme: { extend: { colors: { academy: { bg:'#F7F7F4', ink:'#111111', gold:'#F4C45A', line:'#EAEAEA', green:'#22C55E' } }, boxShadow: { soft:'0 18px 60px rgba(17,17,17,.08)', gold:'0 20px 55px rgba(244,196,90,.35)' }, borderRadius:{ '3xl':'1.75rem' } } }, plugins: [] };
export default config;
