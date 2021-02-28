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
  "Reps": string,
  "RIR": string,
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
    'MAV': "14-22",
    'MRV': "25+",
    "Freq": "2-4 x Week",
    "Reps": "4-20",
    "RIR": "1-3",
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
      "https://youtube.com/embed/5PoEksoJNaw",
      "https://youtube.com/embed/DMo3HJoawrU",
      "https://youtube.com/embed/opjbouBmUWg",
      "https://youtube.com/embed/KOaCM1HMwU0",
      "https://youtube.com/embed/4H2ItXwUTp8",
      "https://youtube.com/embed/UCXxvVItLoM",
      "https://youtube.com/embed/G9uNaXGTJ4w",
      "https://youtube.com/embed/oxpAl14EYyc",
      "https://youtube.com/embed/jQjWlIwG4sI",
      "https://youtube.com/embed/gg5hwJuv6KI",
      "https://youtube.com/embed/GRHLNfmr_oI",
      "https://youtube.com/embed/VprlTxpB1rk",
      "https://youtube.com/embed/--utaPT7XYQ",
      "https://youtube.com/embed/YCKPD4BSD2E",
      "https://youtube.com/embed/EUIri47Epcg",
      "https://youtube.com/embed/L4ChTwrXTjc",
      "https://youtube.com/embed/GdsRZAeeDUc",
      "https://youtube.com/embed/0tiC6RUZL8Y",
      "https://youtube.com/embed/8ygapPMYK1I",
      "https://youtube.com/embed/9JC1EwqezGY",
      "https://youtube.com/embed/XWt6FQAK5wM",
      "https://youtube.com/embed/GRgWPT9XSQQ",
      "https://youtube.com/embed/iWpoegdfgtc"
    ]
  },
  {
    "Muscle": "Quads",
    'MV': "6",
    'MEV': "8-12",
    'MAV': "12-18",
    'MRV': "20+",
    "Freq": "1-3 x Week",
    "Reps": "6-20",
    "RIR": "1-3",
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
    'MV': "4",
    'MEV': "6-10",
    'MAV': "10-16",
    'MRV': "20+",
    "Freq": "2-3 x Week",
    "Reps": "6-20",
    "RIR": "1-3",
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
    'MEV': "0-4",
    'MAV': "4-12",
    'MRV': "16+",
    "Freq": "2-3 x Week",
    "Reps": "6-20",
    "RIR": "1-3",
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
      "https://youtube.com/embed/lzDgRRuBdqY",
      "https://youtube.com/embed/jNihW0WDIL4",
      "https://youtube.com/embed/pfSMst14EFk",
      "https://youtube.com/embed/bnYekgCKfv0",
      "https://youtube.com/embed/4eDJa5MnAmY",
      "https://youtube.com/embed/v709aJKv-gM",
      "https://youtube.com/embed/D-c2CWwEweo",
      "https://youtube.com/embed/pjAewD4LxXs",
      "https://youtube.com/embed/CSXVj047Ss4",
      "https://youtube.com/embed/LU2GYsqkgAQ"
    ]
  },
  {
    "Muscle": "Chest",
    'MV': "8",
    'MEV': "10-12",
    'MAV': "12-20",
    'MRV': "22+",
    "Freq": "2-4 x Week",
    "Reps": "4-20",
    "RIR": "1-3",
    "url": "https://renaissanceperiodization.com/chest-training-tips-hypertrophy/",
    "exercises": []
  },
  {
    "Muscle": "Front-Delts",
    'MV': "0-6",
    'MEV': "6-8",
    'MAV': "16-22",
    'MRV': "26+",
    "Freq": "2-6 x Week",
    "Reps": "8-20",
    "RIR": "0-2",
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
    'MV': "0-6",
    'MEV': "6-8",
    'MAV': "16-22",
    'MRV': "26+",
    "Freq": "2-6 x Week",
    "Reps": "8-20",
    "RIR": "0-2",
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
    'MV': "0-6",
    'MEV': "6-8",
    'MAV': "16-22",
    'MRV': "26+",
    "Freq": "2-6 x Week",
    "Reps": "8-20",
    "RIR": "0-2",
    "url": "https://renaissanceperiodization.com/expert-advice/rear-delt-size-training-tips",
    "exercises": []
  },
  {
    "Muscle": "Biceps",
    'MV': "0-6",
    'MEV': "8-14",
    'MAV': "14-20",
    'MRV': "26+",
    "Freq": "2-6 x Week",
    "Reps": "8-15",
    "RIR": "0-2",
    "url": "https://renaissanceperiodization.com/bicep-training-tips-hypertrophy/",
    "exercises": []
  },
  {
    "Muscle": "Triceps",
    'MV': "0-4",
    'MEV': "6-10",
    'MAV': "10-14",
    'MRV': "18+",
    "Freq": "2-4 x Week",
    "Reps": "8-20",
    "RIR": "0-2",
    "url": "https://renaissanceperiodization.com/triceps-hypertrophy-training-tips/",
    "exercises": []
  },
  {
    "Muscle": "Calves",
    'MV': "0-6",
    'MEV': "8-12",
    'MAV': "12-16",
    'MRV': "20+",
    "Freq": "2-4 x Week",
    "Reps": "8-20",
    "RIR": "0-2",
    "url": "https://renaissanceperiodization.com/calves-training-tips-hypertrophy/",
    "exercises": []
  },
  {
    "Muscle": "Abs",
    'MV': "0",
    'MEV': "1-15",
    'MAV': "16-20",
    'MRV': "25+",
    "Freq": "2-6 x Week",
    "Reps": "8-20",
    "RIR": "0-2",
    "url": "https://renaissanceperiodization.com/ab-training/",
    "exercises": []
  },
  {
    "Muscle": "Traps",
    'MV': "0",
    'MEV': "1-15",
    'MAV': "16-20",
    'MRV': "25+",
    "Freq": "2-6 x Week",
    "Reps": "8-20",
    "RIR": "0-2",
    "url": "https://renaissanceperiodization.com/trap-training-tips-hypertrophy/",
    "exercises": []
  },
  {
    "Muscle": "Forearms",
    'MV': "0",
    'MEV': "1-15",
    'MAV': "16-20",
    'MRV': "25+",
    "Freq": "2-6 x Week",
    "Reps": "8-20",
    "RIR": "0-2",
    "url": "https://renaissanceperiodization.com/expert-advice/forearm-growth-training-tips",
    "exercises": []
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
  displayedColumns: string[] = ["Muscle", 'MV', 'MEV', 'MAV', 'MRV', "Freq", "Reps", "RIR"];

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
