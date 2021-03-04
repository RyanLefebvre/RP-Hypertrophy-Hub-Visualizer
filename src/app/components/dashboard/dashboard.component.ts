import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

/**
 * Defines the interface for the volume landmark objects.
 */
export interface VolumeLandmark {
  "Muscle": string,
  'MV': string,
  'MEV': string,
  'MAV': string,
  'MRV': string,
  "Freq": string,
  "url": string,
  "exercises": any[]
};

/**
 * List of objects representing the muscle group specific
 * definitions for the RP volume landmarks.
 */
const VOLUME_LANDMARKS: VolumeLandmark[] = [
  {
    "Muscle": "Back",
    'MV': "6",
    'MEV': "10",
    'MAV': "11-19",
    'MRV': "20-35",
    "Freq": "2-4 x Week",
    "url": "https://renaissanceperiodization.com/back-training-tips-hypertrophy/",
    "exercises": [
      "https://youtube.com/embed/6FZHJGzMFEc",
      "https://youtube.com/embed/jiowkUMomlw",
      "https://youtube.com/embed/UPGuwx7GQ9s",
      "https://youtube.com/embed/H260SUUyJBM",
      "https://youtube.com/embed/3QcJggd_L24",
      "https://youtube.com/embed/0UBRfiO4zDs",
      "https://youtube.com/embed/_FrrYQxA6kc",
      "https://youtube.com/embed/yPis7nlbqdY",
      "https://youtube.com/embed/tZUYS7X50so",
      "https://youtube.com/embed/5PoEksoJNaw"
    ]
  },
  {
    "Muscle": "Quads",
    'MV': "6",
    'MEV': "8",
    'MAV': "9-17",
    'MRV': "18-30",
    "Freq": "2-3 x Week",
    "url": "https://renaissanceperiodization.com/expert-advice/quad-size-training-tips",
    "exercises": [
      "https://youtube.com/embed/-eO_VydErV0",
      "https://youtube.com/embed/0DQvn2qsOG4",
      "https://youtube.com/embed/HHxNbhP16UE",
      "https://youtube.com/embed/rYgNArpwE7E",
      "https://youtube.com/embed/i7J5h7BJ07g",
      "https://youtube.com/embed/m0FOpMEgero",
      "https://youtube.com/embed/yZmx_Ac3880",
      "https://youtube.com/embed/1IIPcUCKxcE",
      "https://youtube.com/embed/L__-j2v_LPM"
    ]
  },
  {
    "Muscle": "Hamstrings",
    'MV': "3",
    'MEV': "4",
    'MAV': "5-12",
    'MRV': "13-18",
    "Freq": "2-3 x Week",
    "url": "https://renaissanceperiodization.com/expert-advice/hamstring-size-training-tips",
    "exercises": [
      "https://youtube.com/embed/5_ejbGfdAQE",
      "https://youtube.com/embed/cYKYGwcg0U8",
      "https://youtube.com/embed/SBGYSfoqyfU",
      "https://youtube.com/embed/dEJ0FTm-CEk",
      "https://youtube.com/embed/mnxn-7SO9Ks",
      "https://youtube.com/embed/n5WDXD_mpVY",
      "https://youtube.com/embed/Orxowest56U",
      "https://youtube.com/embed/N6FVnaasdq0",
      "https://youtube.com/embed/CN_7cz3P-1U"
    ]
  },
  {
    "Muscle": "Glutes",
    'MV': "0",
    'MEV': "0",
    'MAV': "4-12",
    'MRV': "13-30",
    "Freq": "1-3 x Week",
    "url": "https://renaissanceperiodization.com/glute-training-tips-hypertrophy/",
    "exercises": [
      "https://youtube.com/embed/EF7jXP17DPE",
      "https://youtube.com/embed/_meXEWq5MOQ",
      "https://youtube.com/embed/pv8e6OSyETE",
      "https://youtube.com/embed/AweC3UaM14o",
      "https://youtube.com/embed/kvWcDHH62j0",
      "https://youtube.com/embed/X-uKkAukJVA",
      "https://youtube.com/embed/eFWCn5iEbTU",
      "https://youtube.com/embed/NLDBFtSNhqg",
      "https://youtube.com/embed/ZSPmIyX9RZs",
      "https://youtube.com/embed/TQfhY5oJ_Sc",
    ]
  },
  {
    "Muscle": "Chest",
    'MV': "4",
    'MEV': "6",
    'MAV': "7-19",
    'MRV': "20-35",
    "Freq": "2-3 x Week",
    "url": "https://renaissanceperiodization.com/chest-training-tips-hypertrophy/",
    "exercises": [
      "https://youtube.com/embed/4mfLHnFL0Uw",
      "https://youtube.com/embed/Cj6P91eFXkM",
      "https://youtube.com/embed/e_8HLu59-to",
      "https://youtube.com/embed/_9VlfuYYC7w",
      "https://youtube.com/embed/gmNlqsE3Onc",
      "https://youtube.com/embed/YQ2s_Y7g5Qk",
      "https://youtube.com/embed/JFm8KbhjibM",
      "https://youtube.com/embed/BhlL-esnitU",
      "https://youtube.com/embed/aV1U_mK3XOs",
      "https://youtube.com/embed/0Wa9CfRXUkA",
    ]
  },
  {
    "Muscle": "Front-Delts",
    'MV': "0",
    'MEV': "0",
    'MAV': "0-12",
    'MRV': "16",
    "Freq": "2-6 x Week",
    "url": "https://renaissanceperiodization.com/front-delt-training-tips-hypertrophy/",
    "exercises": [
      "https://youtube.com/embed/_ikCPws1mbE",
      "https://youtube.com/embed/yIoAcMD3jcE",
      "https://youtube.com/embed/hRJ6tR5-if0",
      "https://youtube.com/embed/87pZAbYjXc4",
      "https://youtube.com/embed/WvLMauqrnK8",
      "https://youtube.com/embed/IuzRCN6eG6Y",
      "https://youtube.com/embed/HzIiNhHhhtA",
      "https://youtube.com/embed/OLqZDUUD2b0",
      "https://youtube.com/embed/G2qpTG1Eh40",
      "https://youtube.com/embed/Raemd3qWgJc"
    ]
  },
  {
    "Muscle": "Side-Delts",
    'MV': "6",
    'MEV': "8",
    'MAV': "9-24",
    'MRV': "25-40",
    "Freq": "3+ x Week",
    "url": "https://renaissanceperiodization.com/expert-advice/side-delt-size-training-tips",
    "exercises": [
      "https://youtube.com/embed/um3VVzqunPU",
      "https://youtube.com/embed/2OMbdPF7mz4",
      "https://youtube.com/embed/qr3ziolhjvQ",
      "https://youtube.com/embed/Ub6QruNKfbY",
      "https://youtube.com/embed/OuG1smZTsQQ",
      "https://youtube.com/embed/lq7eLC30b9w",
      "https://youtube.com/embed/0o07iGKUarI",
      "https://youtube.com/embed/QIpa-9dtkgA",
      "https://youtube.com/embed/D1f7d1OcobY",
      "https://youtube.com/embed/SKf8wHlIFX0"
    ]
  },
  {
    "Muscle": "Rear-Delts",
    'MV': "0",
    'MEV': "6",
    'MAV': "7-17",
    'MRV': "18-35",
    "Freq": "2-5 x Week",
    "url": "https://renaissanceperiodization.com/expert-advice/rear-delt-size-training-tips",
    "exercises": [
      "https://youtube.com/embed/34gVHrkaiz0",
      "https://youtube.com/embed/f0g5NkYiWUY",
      "https://youtube.com/embed/-MODnZdnmAQ",
      "https://youtube.com/embed/qz1OLup4W_M",
      "https://youtube.com/embed/nzTY7j9ocR8",
      "https://youtube.com/embed/90cE3rCLtmo",
      "https://youtube.com/embed/z3PRz2aVA10",
      "https://youtube.com/embed/8CGMuud1ANw",
      "https://youtube.com/embed/5YK4bgzXDp0",
      "https://youtube.com/embed/hPWYuhJMUhU"
    ]
  },
  {
    "Muscle": "Biceps",
    'MV': "4",
    'MEV': "8",
    'MAV': "9-19",
    'MRV': "20-35",
    "Freq": "2-3 x Week",
    "url": "https://renaissanceperiodization.com/bicep-training-tips-hypertrophy/",
    "exercises": [
      "https://youtube.com/embed/iixND1P2lik",
      "https://youtube.com/embed/pUS6HBQjRmc",
      "https://youtube.com/embed/JnLFSFurrqQ",
      "https://youtube.com/embed/yuozln3CC94",
      "https://youtube.com/embed/opFVuRi_3b8",
      "https://youtube.com/embed/fuK3nFvwgXk",
      "https://youtube.com/embed/ke2shAeQ0O8",
      "https://youtube.com/embed/tRXw8HQ7-oA",
      "https://youtube.com/embed/cdmnvo3augg",
      "https://youtube.com/embed/EK747VC37yE",
    ]
  },
  {
    "Muscle": "Triceps",
    'MV': "4",
    'MEV': "6",
    'MAV': "7-19",
    'MRV': "20+",
    "Freq": "2-6 x Week",
    "url": "https://renaissanceperiodization.com/triceps-hypertrophy-training-tips/",
    "exercises": [
      "https://youtube.com/embed/q5X9thiKofE",
      "https://youtube.com/embed/yZ83t4mrPrI",
      "https://youtube.com/embed/l3rHYPtMUo8",
      "https://youtube.com/embed/1u18yJELsh0",
      "https://youtube.com/embed/Cp_bShvMY4c",
      "https://youtube.com/embed/6Fzep104f0s",
      "https://youtube.com/embed/4LA1kF7yCGo",
      "https://youtube.com/embed/jPjhQ2hsAds",
      "https://youtube.com/embed/IdZ7HXnatko",
      "https://youtube.com/embed/1lrjpLuXH4w",
    ]
  },
  {
    "Muscle": "Calves",
    'MV': "0",
    'MEV': "2-8",
    'MAV': "9-19",
    'MRV': "20+",
    "Freq": "2-6 x Week",
    "url": "https://renaissanceperiodization.com/calves-training-tips-hypertrophy/",
    "exercises": [
      "https://youtube.com/embed/N3awlEyTY98",
      "https://youtube.com/embed/__qfDhdByMY",
      "https://youtube.com/embed/_gEx2ijsmNM",
      "https://youtube.com/embed/hh5516HCu4k",
      "https://youtube.com/embed/KxEYX_cuesM"
    ]
  },
  {
    "Muscle": "Abs",
    'MV': "0",
    'MEV': "0-6",
    'MAV': "7-24",
    'MRV': "25+",
    "Freq": "2-6 x Week",
    "url": "https://renaissanceperiodization.com/ab-training/",
    "exercises": [
      "https://youtube.com/embed/RD_A-Z15ER4",
      "https://youtube.com/embed/7FwGZ8qY5OU",
      "https://youtube.com/embed/-OUSBPnHvsQ",
      "https://youtube.com/embed/T_X5rb3G5lk",
      "https://youtube.com/embed/pXg8qppif7I",
      "https://youtube.com/embed/6GMKPQVERzw",
      "https://youtube.com/embed/DAnTf16NcT0",
      "https://youtube.com/embed/BIOM5eSsJ_8"
    ]
  },
  {
    "Muscle": "Traps",
    'MV': "0",
    'MEV': "4",
    'MAV': "7-24",
    'MRV': "25+",
    "Freq": "2-6 x Week",
    "url": "https://renaissanceperiodization.com/trap-training-tips-hypertrophy/",
    "exercises": [
      "https://youtube.com/embed/M_MjF5Nm_h4",
      "https://youtube.com/embed/d9daNDIXtK8",
      "https://youtube.com/embed/_t3lrPI6Ns4",
      "https://youtube.com/embed/5z7ZtboxbBY",
      "https://youtube.com/embed/GH_l85Ky3vA",
      "https://youtube.com/embed/BeIcUXQ3RDc",
      "https://youtube.com/embed/2zaT3WAgZi0",
      "https://youtube.com/embed/zgToz5FiI-E",
      "https://youtube.com/embed/YykmcX2b-LY",
      "https://youtube.com/embed/nOn_Bz0zrwQ"
    ]
  },
  {
    "Muscle": "Forearms",
    'MV': "0",
    'MEV': "2-8",
    'MAV': "9-19",
    'MRV': "20+",
    "Freq": "2-6 x Week",
    "url": "https://renaissanceperiodization.com/expert-advice/forearm-growth-training-tips",
    "exercises": [
      "https://youtube.com/embed/lfQR7oVS8eo",
      "https://youtube.com/embed/iQ4JjOK73PE",
      "https://youtube.com/embed/2wPpcJBe03o",
      "https://youtube.com/embed/WVAaKJvToe0"
    ]
  }
];

/**
 * Main display for the web application. Contains a grid with a list 
 * of all the muscle group landmark objects. When an object is clicked
 * on, it opens a display with in-depth recomendations for the landmarks.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  /**
   * Columns displayed by the hypertrophy training landmarks.
   */
  displayedColumns: string[] = ["Muscle", 'MV', 'MEV', 'MAV', 'MRV', "Freq"];

  /**
   * Rows displayed by hypetrophy training landmarks.
   */
  dataSource: VolumeLandmark[] = VOLUME_LANDMARKS;

  /**
  * Used as a constant mean no muscle group selected.
  */
  NO_MUSCLE_GROUP: null = null;

  /**
   * Contains the selected muscle group. Null if no muscle group is selected.
   */
  selectedMuscleGroup: VolumeLandmark | null = this.NO_MUSCLE_GROUP;

  /**
   * Reference to the query param subscription.
   */
  queryParamSubscriptionRef: Subscription = null;

  /**
   * Chart options used to configure the Chart.js canvas element.
   */
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Sets per week"
        }
      }]
    }
  }

  /**
   * Data passed to the Chart.js canvas object.
   */
  chartData: any[] = [];

  /**
   * Contains the x-axis labels for the Chart.js canvas element.
   */
  chartLabels: string[] = [];

  /**
   * @ignore 
   */
  constructor(
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public router: Router) { }

  /**
  * Creates subscription.
  */
  ngOnInit() {
    this.queryParamSubscriptionRef = this.routeChangeSubscription();
  }

  /**
  * Destroys subscriptions if they exist.
  */
  ngOnDestroy() {
    if (this.queryParamSubscriptionRef) {
      this.queryParamSubscriptionRef.unsubscribe();
    }
  }

  /**
   * Opens a dialog that allows users to share the current URL.
   */
  openShareDialog(): void {
    this.dialog.open(ShareDialogComponent, {
      width: '95%',
      maxWidth: '575px',
      minWidth: '290px',
    });
  }

  /**
   * Appends the name of a muscle group to the current URL to 
   * trigger a route change event. If the muscle group provided
   * is a valid muscle group then the route change subscription
   * will take the user to the correct display for that group.
   * If no muscle group is provided, then the user is navigated 
   * back to the dashboard.
   * 
   * @param muscleGroup Muscle group to navigate to the in depth display for.
   */
  navigateTo(muscleGroup: VolumeLandmark) {
    const origin: string = (window.location.origin);
    const isLocalHost: boolean = origin.includes("localhost");
    let musclePath: string = "";
    if (!isLocalHost) {
      musclePath += ("/RP-Hypertrophy-Hub-Visualizer");
    }
    musclePath += ("/#/");
    if (muscleGroup) {
      musclePath += muscleGroup.Muscle
    }
    const fullRoutePath: string = (origin + musclePath);
    window.location.href = fullRoutePath;
    window.scrollTo(0, 0);
  }

  /**
   * Handles clicking on a row in the hypertrophy table.
   * Sets the activated muscle group to the one that was
   * just clicked on in the table.
   * 
   * @param muscleGroup Muscle group to navigate to the in depth display for.
   */
  setSelectedMuscleGroup(muscleGroup: VolumeLandmark): void {
    this.setChartFromMuscleGroup(muscleGroup);
    this.dataSource = [muscleGroup];
    this.selectedMuscleGroup = muscleGroup;
  }

  /**
   * Returns true if there is no muscle group selected. False otherwise.
   */
  noMuscleGroupSelected(): boolean {
    return (this.selectedMuscleGroup == this.NO_MUSCLE_GROUP);
  }

  /**
   * Returns the user to the original dashboard they saw when the
   * web app is loaded with the default route and no path indicating
   * a selected muscle group.
   */
  goBackToDashBoard(): void {
    this.dataSource = VOLUME_LANDMARKS;
    this.selectedMuscleGroup = this.NO_MUSCLE_GROUP;
    this.navigateTo(this.NO_MUSCLE_GROUP);
  }

  /**
   * Listens to the activated route for any changes.
   * If the route is changed, then the volume landmarks are 
   * checked to see if a path is added that corresponds
   * to one of the muscle groups. If one exists, then that 
   * muscle group is selected. If one does not exist, then the 
   * user is sent back to the dashboard.
   * 
   * Returns the subscription object so it can be unsubscribed
   * from in the ngOnDestroy() block.
   * 
   * If any error occurs while loading a display for a route, then
   * the error is caught and the user is returned to the dashboard.
   */
  routeChangeSubscription(): Subscription {
    return this.router.events.subscribe((routerEvent: any) => {
      try {
        const isValidEvent: boolean = (routerEvent != null && routerEvent instanceof NavigationEnd);
        if (isValidEvent) {
          const url: string = routerEvent.url;
          const muscleGroupObject: VolumeLandmark = VOLUME_LANDMARKS.find((muscleGroup: VolumeLandmark) => {
            const requestedMuscleExists: boolean = (url.toLowerCase().includes(muscleGroup.Muscle.toLowerCase()))
            return requestedMuscleExists;
          });
          if (muscleGroupObject) {
            this.setSelectedMuscleGroup(muscleGroupObject)
          } else {
            this.goBackToDashBoard();
          }
        }
      }
      catch (error) {
        this.goBackToDashBoard();
      }
    });
  }

  /**
   * Converts the volume recommendations for a muscle group into 
   * data that can be displayed on the volume bar chart.
   */
  setChartFromMuscleGroup(muscleGroup: VolumeLandmark): void {
    const defaultChartLabels: string[] = ["MV", "MEV", "MAV", "MRV"];
    let actualChartLabels: string[] = [];
    const dataTitle: string = (muscleGroup.Muscle + " Volume");
    const volumeData: number[] = [];
    const muscleGroupChartData: any = {
      label: dataTitle,
      data: volumeData,
      backgroundColor: "#ee2d37",
      hoverBackgroundColor: "#b1232a",
    }
    defaultChartLabels.forEach((label: string) => {
      actualChartLabels.push(label);
      const volumeRecommendation: string = muscleGroup[label];
      const isRange: boolean = volumeRecommendation.includes("-");
      if (isRange) {
        const splitRecommendation: string[] = volumeRecommendation.split("-");
        const minVolumeRange: number = parseInt(splitRecommendation[0]);
        const maxVolumeRange: number = parseInt(splitRecommendation[1]);
        volumeData.push(minVolumeRange);
        volumeData.push(maxVolumeRange);
        const deepCopyOfLabel: string = (label + " ").trim();
        const labelIdx: number = actualChartLabels.indexOf(label);
        actualChartLabels[labelIdx] = "Min " + deepCopyOfLabel;
        actualChartLabels.push("Max " + deepCopyOfLabel);
      }
      else {
        volumeData.push(parseInt(volumeRecommendation));
      }
    });
    const volumeDataAsLine = {
      type: "line",
      fill: false,
      label: "Volume Curve",
      order: 1,
      data: volumeData
    }
    this.chartData = [muscleGroupChartData, volumeDataAsLine];
    this.chartLabels = actualChartLabels;
  }

}
