'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Message from "./Message";
import { useEffect, useState, useRef } from "react";
import ChatBox from "./ChatBox";

export default function Home() {
  
  return (
    <main>
      <ChatBox />
    </main>
  );
}