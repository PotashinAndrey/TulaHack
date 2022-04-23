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
    ad integer NOT NULL,
    image integer NOT NULL
);


ALTER TABLE public.ad_images OWNER TO postgres;

--
-- Name: ads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ads (
    id integer NOT NULL,
    author integer NOT NULL,
    name text NOT NULL,
    description text,
    price numeric DEFAULT 0,
    opened_date bigint NOT NULL,
    opened boolean DEFAULT true
);


ALTER TABLE public.ads OWNER TO postgres;

--
-- Name: adds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.adds_id_seq OWNER TO postgres;

--
-- Name: adds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.adds_id_seq OWNED BY public.ads.id;


--
-- Name: bids; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bids (
    ad integer NOT NULL,
    author integer NOT NULL,
    amount numeric NOT NULL
);


ALTER TABLE public.bids OWNER TO postgres;

--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: ad_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ad_images (ad, image) FROM stdin;
1	1
\.


--
-- Data for Name: ads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ads (id, author, name, description, price, opened_date, opened) FROM stdin;
1	1	Грязный носок	Побывал везде	1337.88	1650741391144	t
\.


--
-- Data for Name: bids; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bids (ad, author, amount) FROM stdin;
1	2	1500
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id) FROM stdin;
1
2
3
4
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
-- Name: adds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adds_id_seq', 1, true);


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id_seq', 4, true);


--
-- Name: ad_images ad_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_images
    ADD CONSTRAINT ad_images_pkey PRIMARY KEY (ad, image);


--
-- Name: ads adds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT adds_pkey PRIMARY KEY (id);


--
-- Name: bids bids_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bids
    ADD CONSTRAINT bids_pkey PRIMARY KEY (ad);


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
-- Name: ad_images ad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_images
    ADD CONSTRAINT ad_id_fkey FOREIGN KEY (ad) REFERENCES public.ads(id);


--
-- Name: bids bids_ad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bids
    ADD CONSTRAINT bids_ad_fkey FOREIGN KEY (ad) REFERENCES public.ads(id) NOT VALID;


--
-- Name: bids bids_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bids
    ADD CONSTRAINT bids_author_fkey FOREIGN KEY (author) REFERENCES public.users(id) NOT VALID;


--
-- Name: ad_images image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ad_images
    ADD CONSTRAINT image_id_fkey FOREIGN KEY (image) REFERENCES public.images(id);


--
-- PostgreSQL database dump complete
--

