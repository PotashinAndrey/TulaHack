--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ad_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ad_images (
    ad text NOT NULL,
    image text NOT NULL
);


ALTER TABLE public.ad_images OWNER TO postgres;

--
-- Name: ads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ads (
    id text NOT NULL,
    author integer NOT NULL,
    name text NOT NULL,
    description text,
    price numeric DEFAULT 0,
    opened_date bigint NOT NULL,
    opened boolean DEFAULT true,
    winner_bid text
);


ALTER TABLE public.ads OWNER TO postgres;

--
-- Name: bids; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bids (
    author integer NOT NULL,
    amount numeric NOT NULL,
    id integer NOT NULL,
    ad text
);


ALTER TABLE public.bids OWNER TO postgres;

--
-- Name: bids_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bids_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bids_id_seq OWNER TO postgres;

--
-- Name: bids_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bids_id_seq OWNED BY public.bids.id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id text NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: bids id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bids ALTER COLUMN id SET DEFAULT nextval('public.bids_id_seq'::regclass);


--
-- Data for Name: ad_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_images (ad, image) FROM stdin;
21adf549-9a47-40d3-9ec2-c38877851d50	5db6764e-4e85-4c87-a6e5-36ed14dd2778
25f1daa5-f2d2-46a8-afbd-bd10db535d7e	e657cc58-30df-4c7c-a699-abd70fd26a73
7787c934-8884-4483-a4a8-cae922160d54	27ae6834-54d6-47f3-b764-711adeb8f894
d25163ef-72d6-4370-889a-99f861f09137	ce918c49-5573-4934-9346-3e9a6fcc50be
fff5e9ef-cd1e-48ba-a351-0c52b7d2c7d2	1b6f629e-cbc2-4add-9426-91529d6cca77
92c9c845-6e82-4040-be72-2c4c93f6fd73	e03c0e7e-231a-4969-9365-5b97830c8168
8cc6e300-bb2b-4d35-8344-d2cd13d917d3	78b09669-39b7-4b1c-adeb-aeec71c0b3f6
40fd8df8-d768-4cf4-a099-7d3d1dac7f32	79686e56-34d3-4c79-b4f4-e4bbe8fe3d82
31e4beaf-a2fa-4fa4-99f3-db5b751f1dd4	dbe21b8f-30a3-45d6-aec4-e2570758c375
90198b00-5433-4034-99fc-c2c99992ac73	df051f59-310e-426d-8d4b-41b63006a9b2
d11e9ba3-98d8-42fb-88cd-8f613d918cd9	a00aa1c6-4617-49f7-9ac0-559922c320bf
db4f7a8e-6c9c-4833-96a2-a2593f5c11e4	3b637120-9a9c-4d84-8195-bfefcab94a68
0efa7c5b-a2c5-4a2a-aae3-d20ee4a5aeba	a36bb9ad-31ea-4d60-84fd-0d4e9f337752
b4a03969-dffe-4b1b-a198-6a8f06926da7	14aa5878-c8f6-4cb7-8298-1eb8b949f634
e9707912-849a-454b-b923-b29a2720ebd5	e948b793-e5f2-4eeb-b4b0-50788b9b5666
5b6796cd-f208-4c74-ac45-7629857f364e	e5d20df5-0c5f-4fe3-96e1-aa23ced7f5bb
8a1a813a-b3f1-4aa4-a41b-78f4e892c818	83aa5c02-b930-432d-af26-b0fa3fc0e509
51e5ed36-9a87-414f-9be5-3746d63afca4	6598fc09-fec8-4d55-9356-6f74e18dc65a
40738642-0a33-4308-b6d6-566d7ccdee6c	683b38b4-b86b-4998-8a30-d4abea8b52ad
\.


--
-- Data for Name: ads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ads (id, author, name, description, price, opened_date, opened, winner_bid) FROM stdin;
21adf549-9a47-40d3-9ec2-c38877851d50	1	Nosok	Носочек	233	1650784503305	t	\N
1f0bf8a3-b6e0-4341-8529-51d2b5ace19d	1	asdad	asda	1000	1650791007529	t	\N
25f1daa5-f2d2-46a8-afbd-bd10db535d7e	1	adada	sadad	1000	1650791128263	t	\N
2d953030-39b4-4681-955a-150b80395079	1	asda	dadad	1000	1650791775141	t	\N
7787c934-8884-4483-a4a8-cae922160d54	1	sadad	sadada	1000	1650792237084	t	\N
7993336e-ad2d-4ce9-870d-0e5b45f87303	1	asda	adsda	1000	1650792466679	t	\N
d25163ef-72d6-4370-889a-99f861f09137	1	adada	asdad	1000	1650792493223	t	\N
fff5e9ef-cd1e-48ba-a351-0c52b7d2c7d2	1	asda	adsad	1000	1650792713072	t	\N
92c9c845-6e82-4040-be72-2c4c93f6fd73	1	Зачетка	aaa	1000	1650792762701	t	\N
8cc6e300-bb2b-4d35-8344-d2cd13d917d3	1	фывфв	фывфв	1000	1650792829393	t	\N
40fd8df8-d768-4cf4-a099-7d3d1dac7f32	1	Чето	ыфвф	1000	1650792892020	t	\N
31e4beaf-a2fa-4fa4-99f3-db5b751f1dd4	1	фывф	фывфвф	1000	1650792918371	t	\N
90198b00-5433-4034-99fc-c2c99992ac73	1	sada	asdad	1000	1650793049974	t	\N
d11e9ba3-98d8-42fb-88cd-8f613d918cd9	1	asda	dada	1000	1650793147918	t	\N
db4f7a8e-6c9c-4833-96a2-a2593f5c11e4	1	sada	ddddd	1000	1650793285971	t	\N
0efa7c5b-a2c5-4a2a-aae3-d20ee4a5aeba	1	asdad	adada	1000	1650793362451	t	\N
b4a03969-dffe-4b1b-a198-6a8f06926da7	1	asdad	adada	1000	1650793470795	t	\N
e9707912-849a-454b-b923-b29a2720ebd5	1	1241	124141	1000	1650793562607	t	\N
5b6796cd-f208-4c74-ac45-7629857f364e	1	asda	sadada	1000	1650793604193	t	\N
8a1a813a-b3f1-4aa4-a41b-78f4e892c818	1	asda	asdada	1000	1650793789855	t	\N
51e5ed36-9a87-414f-9be5-3746d63afca4	1	asdada	asda	1000	1650793873048	t	\N
40738642-0a33-4308-b6d6-566d7ccdee6c	1	sadad	asdada	1000	1650793961680	t	\N
\.


--
-- Data for Name: bids; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bids (author, amount, id, ad) FROM stdin;
1	1001	20	21adf549-9a47-40d3-9ec2-c38877851d50
1	1002	21	21adf549-9a47-40d3-9ec2-c38877851d50
1	1003	22	21adf549-9a47-40d3-9ec2-c38877851d50
1	1001	23	21adf549-9a47-40d3-9ec2-c38877851d50
2	1500	1	21adf549-9a47-40d3-9ec2-c38877851d50
1	200	2	21adf549-9a47-40d3-9ec2-c38877851d50
1	200	3	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	4	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	5	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	6	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	7	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	8	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	9	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	10	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	11	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	12	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	13	21adf549-9a47-40d3-9ec2-c38877851d50
1	1450	14	21adf549-9a47-40d3-9ec2-c38877851d50
1	23	15	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	16	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	17	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	18	21adf549-9a47-40d3-9ec2-c38877851d50
1	150	19	21adf549-9a47-40d3-9ec2-c38877851d50
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id) FROM stdin;
27ae6834-54d6-47f3-b764-711adeb8f894
ce918c49-5573-4934-9346-3e9a6fcc50be
1b6f629e-cbc2-4add-9426-91529d6cca77
e03c0e7e-231a-4969-9365-5b97830c8168
78b09669-39b7-4b1c-adeb-aeec71c0b3f6
79686e56-34d3-4c79-b4f4-e4bbe8fe3d82
dbe21b8f-30a3-45d6-aec4-e2570758c375
df051f59-310e-426d-8d4b-41b63006a9b2
a00aa1c6-4617-49f7-9ac0-559922c320bf
3b637120-9a9c-4d84-8195-bfefcab94a68
a36bb9ad-31ea-4d60-84fd-0d4e9f337752
14aa5878-c8f6-4cb7-8298-1eb8b949f634
e948b793-e5f2-4eeb-b4b0-50788b9b5666
e5d20df5-0c5f-4fe3-96e1-aa23ced7f5bb
83aa5c02-b930-432d-af26-b0fa3fc0e509
6598fc09-fec8-4d55-9356-6f74e18dc65a
683b38b4-b86b-4998-8a30-d4abea8b52ad
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name) FROM stdin;
1	Andrey
2	Rinat
3	Ilya
\.


--
-- Name: bids_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bids_id_seq', 23, true);


--
-- Name: ad_images ad_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_images
    ADD CONSTRAINT ad_images_pkey PRIMARY KEY (ad, image);


--
-- Name: ads ads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_pkey PRIMARY KEY (id);


--
-- Name: bids bids_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bids
    ADD CONSTRAINT bids_pkey PRIMARY KEY (id) INCLUDE (id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

