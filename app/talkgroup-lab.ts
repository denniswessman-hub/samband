export type TalkgroupFolder = {
  id: string;
  label: string;
  parent: string | null;
  children?: string[];
  groups?: string[];
};

export type NavigationExercise = {
  id: string;
  title: string;
  briefing: string;
  startFolder: string;
  startGroup?: string;
  targetFolder: string;
  targetGroup: string;
  reason: string;
  sourceNote: string;
};

export const rootFolderIds = [
  "version",
  "skan",
  "rlc-nlc",
  "samvpol",
  "nat-kom",
  "reg-upu",
  "reg-spu",
  "reg-bpu",
  "reg-lpu",
  "reg-mpu",
  "polkon",
  "pu-trafik",
  "samverkan",
  "dmo",
] as const;

const folders: TalkgroupFolder[] = [
  { id: "version", label: "VERSION", parent: null, groups: ["Programversion"] },
  { id: "skan", label: "SKAN", parent: null, children: ["skan-igv-po1", "skan-igv-po2", "skan-lpo-kirseberg"] },
  { id: "skan-igv-po1", label: "SKAN IGV PO1 MPU", parent: "skan" },
  { id: "skan-igv-po2", label: "SKAN IGV PO2 MPU", parent: "skan" },
  { id: "skan-lpo-kirseberg", label: "SKAN LPO KIRSEBERG", parent: "skan" },
  { id: "rlc-nlc", label: "RLC/NLC", parent: null, groups: ["RLC POL UPU", "RLC POL SPU", "RLC POL BPU", "RLC POL LPU", "RLC POL MPU"] },
  { id: "samvpol", label: "SAMVPOL", parent: null, groups: ["MPU SAMV POL 1", "MPU SAMV POL 2"] },
  { id: "nat-kom", label: "NAT KOM", parent: null, groups: ["Kom 01 PU NAT", "Kom 02 PU NAT", "Kom 03 PU NAT"] },
  { id: "reg-upu", label: "REG UPU", parent: null },
  { id: "reg-spu", label: "REG SPU", parent: null },
  { id: "reg-bpu", label: "REG BPU", parent: null },
  {
    id: "reg-lpu",
    label: "REG LPU",
    parent: null,
    children: ["lpu-order", "lpu-insats", "lpu-kom", "lpu-arena", "lpu-proj", "lpu-ovn", "lpu-po", "lpu-raps"],
  },
  { id: "lpu-order", label: "LPU ORDER", parent: "reg-lpu", groups: ["Order Reg LPU", "Order PO1 LPU", "Order PO2 LPU", "Order PO3 LPU", "Order PO4 LPU", "Order PO5 LPU"] },
  { id: "lpu-insats", label: "LPU INSATS", parent: "reg-lpu", groups: ["Insats 1 LPU", "Insats 2 LPU", "Insats 3 LPU", "Insats 55 LPU"] },
  { id: "lpu-kom", label: "LPU KOM", parent: "reg-lpu", groups: ["Kom 1 LPU", "Kom 2 LPU", "Kom 3 LPU", "Kom 4 LPU", "Kom 5 LPU"] },
  { id: "lpu-arena", label: "LPU ARENA", parent: "reg-lpu", groups: ["Arena 1 LPU", "Arena 2 LPU"] },
  { id: "lpu-proj", label: "LPU PROJ", parent: "reg-lpu", groups: ["Proj 1 LPU", "Proj 2 LPU", "Proj 22 LPU"] },
  { id: "lpu-ovn", label: "LPU ÖVN", parent: "reg-lpu", groups: ["Övn 1 LPU", "Övn 2 LPU"] },
  { id: "lpu-po", label: "LPU PO", parent: "reg-lpu" },
  { id: "lpu-raps", label: "LPU RAPS", parent: "reg-lpu", groups: ["LPU RAPS-01", "LPU RAPS-02", "LPU RAPS-03", "LPU RAPS-06"] },
  {
    id: "reg-mpu",
    label: "REG MPU",
    parent: null,
    children: ["mpu-order", "mpu-insats", "mpu-kom", "mpu-arena", "mpu-proj", "mpu-ovn", "mpu-po", "mpu-raps"],
  },
  { id: "mpu-order", label: "MPU ORDER", parent: "reg-mpu", groups: ["Order Reg MPU", "Order PO1 MPU", "Order PO2 MPU", "Order PO3 MPU", "Order PO4 MPU", "Order PO5 MPU"] },
  { id: "mpu-insats", label: "MPU INSATS", parent: "reg-mpu", groups: ["Insats 1 MPU", "Insats 2 MPU", "Insats 3 MPU", "Insats 55 MPU"] },
  { id: "mpu-kom", label: "MPU KOM", parent: "reg-mpu", groups: ["Kom 1 MPU", "Kom 2 MPU", "Kom 3 MPU", "Kom 4 MPU", "Kom 5 MPU"] },
  { id: "mpu-arena", label: "MPU ARENA", parent: "reg-mpu", groups: ["Arena 1 MPU", "Arena 2 MPU"] },
  { id: "mpu-proj", label: "MPU PROJ", parent: "reg-mpu", groups: ["Proj 1 MPU", "Proj 2 MPU", "Proj 22 MPU"] },
  { id: "mpu-ovn", label: "MPU ÖVN", parent: "reg-mpu", groups: ["Övn 1 MPU", "Övn 2 MPU"] },
  { id: "mpu-po", label: "MPU PO", parent: "reg-mpu", children: ["po1-mpu", "po2-mpu", "po3-mpu", "po4-mpu", "po5-mpu"] },
  { id: "po1-mpu", label: "PO 1 MPU", parent: "mpu-po", groups: ["IGV PO1 MPU", "LPO Centrum", "LPO Sorgenfri"] },
  { id: "po2-mpu", label: "PO 2 MPU", parent: "mpu-po", groups: ["IGV PO2 MPU", "LPO Lindängen", "LPO Oxie"] },
  { id: "po3-mpu", label: "PO 3 MPU", parent: "mpu-po", groups: ["IGV PO3 MPU", "LPO Kirseberg", "LPO V Hamnen"] },
  { id: "po4-mpu", label: "PO 4 MPU", parent: "mpu-po", groups: ["IGV PO4 MPU", "LPO Limhamn", "LPO Slotts"] },
  { id: "po5-mpu", label: "PO 5 MPU", parent: "mpu-po", groups: ["IGV PO5 MPU", "LPO Rosengård", "LPO Husie"] },
  { id: "mpu-raps", label: "MPU RAPS", parent: "reg-mpu", groups: ["MPU RAPS-01", "MPU RAPS-02", "MPU RAPS-03", "MPU RAPS-04", "MPU RAPS-05", "MPU RAPS-06"] },
  { id: "polkon", label: "POLKON", parent: null, groups: ["Polkon 1 MPU", "Polkon 2 MPU", "Polkon 3 MPU", "Polkon 9 MPU"] },
  { id: "pu-trafik", label: "PU TRAFIK", parent: null, groups: ["Trafik 1 MPU", "Trafik 2 MPU", "Trafik 8 MPU"] },
  { id: "samverkan", label: "SAMVERKAN", parent: null },
  { id: "dmo", label: "DMO", parent: null, groups: ["Alla DMO 1", "Alla DMO 2"] },
];

export const talkgroupFolders: Record<string, TalkgroupFolder> = Object.fromEntries(
  folders.map((folder) => [folder.id, folder]),
);

export const navigationExercises: NavigationExercise[] = [
  {
    id: "source-route",
    title: "Källans exempel",
    briefing: "Du står i skanningslistan SKAN IGV PO2 MPU. Navigera till den regionala insatstalgruppen Insats 2 LPU.",
    startFolder: "skan-igv-po2",
    targetFolder: "lpu-insats",
    targetGroup: "Insats 2 LPU",
    reason: "Gå först upp till huvudraden, förflytta dig till REG LPU, gå ned till LPU INSATS och välj talgruppen med vredet.",
    sourceNote: "Navigering talgrupper, sida 6",
  },
  {
    id: "raps-route",
    title: "Till RAPS-mappen",
    briefing: "Du står på Insats 1 MPU. Navigera inom REG MPU till MPU RAPS-03.",
    startFolder: "mpu-insats",
    startGroup: "Insats 1 MPU",
    targetFolder: "mpu-raps",
    targetGroup: "MPU RAPS-03",
    reason: "Gå upp till REG MPU, bläddra till undermappen MPU RAPS och använd vredet till RAPS-03.",
    sourceNote: "Mappar och talgruppsträd HT2025",
  },
  {
    id: "local-route",
    title: "Hitta lokal talgrupp",
    briefing: "Du står på Order Reg MPU. Navigera till LPO Kirseberg i PO 3 MPU.",
    startFolder: "mpu-order",
    startGroup: "Order Reg MPU",
    targetFolder: "po3-mpu",
    targetGroup: "LPO Kirseberg",
    reason: "Följ REG MPU till MPU PO, gå ned till PO 3 MPU och välj LPO Kirseberg med vredet.",
    sourceNote: "Mappar och talgruppsträd HT2025",
  },
  {
    id: "dmo-route",
    title: "Växla till direktläge",
    briefing: "Du står på Kom 1 MPU. Navigera till Alla DMO 1.",
    startFolder: "mpu-kom",
    startGroup: "Kom 1 MPU",
    targetFolder: "dmo",
    targetGroup: "Alla DMO 1",
    reason: "Gå upp till huvudraden, bläddra till DMO och välj Alla DMO 1. Terminalen växlar då till direktläge.",
    sourceNote: "Mappar och talgruppsträd HT2025",
  },
  {
    id: "return-tmo",
    title: "Tillbaka till nätläge",
    briefing: "Du står på Alla DMO 2. Navigera till MPU SAMV POL 2.",
    startFolder: "dmo",
    startGroup: "Alla DMO 2",
    targetFolder: "samvpol",
    targetGroup: "MPU SAMV POL 2",
    reason: "Bläddra på huvudraden till SAMVPOL och välj MPU SAMV POL 2 med vredet. En vanlig talgrupp återför terminalen till TMO.",
    sourceNote: "Mappar och talgruppsträd HT2025",
  },
];

export function folderPath(folderId: string) {
  const path: TalkgroupFolder[] = [];
  let current: TalkgroupFolder | undefined = talkgroupFolders[folderId];
  while (current) {
    path.unshift(current);
    current = current.parent ? talkgroupFolders[current.parent] : undefined;
  }
  return path;
}

export function siblingIds(folderId: string) {
  const folder = talkgroupFolders[folderId];
  if (!folder?.parent) return [...rootFolderIds];
  return talkgroupFolders[folder.parent]?.children ?? [];
}
