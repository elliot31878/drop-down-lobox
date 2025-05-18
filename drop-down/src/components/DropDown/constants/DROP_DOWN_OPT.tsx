import {
  AcademicCapIcon,
  BeakerIcon,
  PaintBrushIcon,
  TrophyIcon,
  PuzzlePieceIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import styles from "../DropDown.module.scss";

export const DROP_DOWN_OPT = [
  {
    label: "Education",
    value: "education",
    icon: <AcademicCapIcon className={styles.optionIcon} />,
  },
  {
    label: "Yeeeah, science!",
    value: "science",
    icon: <BeakerIcon className={styles.optionIcon} />,
  },
  {
    label: "Art",
    value: "art",
    icon: <PaintBrushIcon className={styles.optionIcon} />,
  },
  {
    label: "Sport",
    value: "sport",
    icon: <TrophyIcon className={styles.optionIcon} />,
  },
  {
    label: "Games",
    value: "games",
    icon: <PuzzlePieceIcon className={styles.optionIcon} />,
  },
  {
    label: "Health",
    value: "health",
    icon: <HeartIcon className={styles.optionIcon} />,
  },
];
