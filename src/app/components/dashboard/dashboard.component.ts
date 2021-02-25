import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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
  "RIR": string
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
    "RIR": "1-3"
  },
  {
    "Muscle": "Quads",
    'MV': "6",
    'MEV': "8-12",
    'MAV': "12-18",
    'MRV': "20+",
    "Freq": "1-3 x Week",
    "Reps": "6-20",
    "RIR": "1-3"
  },
  {
    "Muscle": "Hamstrings",
    'MV': "4",
    'MEV': "6-10",
    'MAV': "10-16",
    'MRV': "20+",
    "Freq": "2-3 x Week",
    "Reps": "6-20",
    "RIR": "1-3"
  },
  {
    "Muscle": "Glutes",
    'MV': "0",
    'MEV': "0-4",
    'MAV': "4-12",
    'MRV': "16+",
    "Freq": "2-3 x Week",
    "Reps": "6-20",
    "RIR": "1-3"
  },
  {
    "Muscle": "Chest",
    'MV': "8",
    'MEV': "10-12",
    'MAV': "12-20",
    'MRV': "22+",
    "Freq": "2-4 x Week",
    "Reps": "4-20",
    "RIR": "1-3"
  },
  {
    "Muscle": "Delts",
    'MV': "0-6",
    'MEV': "6-8",
    'MAV': "16-22",
    'MRV': "26+",
    "Freq": "2-6 x Week",
    "Reps": "8-20",
    "RIR": "0-2"
  },
  {
    "Muscle": "Biceps",
    'MV': "0-6",
    'MEV': "8-14",
    'MAV': "14-20",
    'MRV': "26+",
    "Freq": "2-6 x Week",
    "Reps": "8-15",
    "RIR": "0-2"
  },
  {
    "Muscle": "Triceps",
    'MV': "0-4",
    'MEV': "6-10",
    'MAV': "10-14",
    'MRV': "18+",
    "Freq": "2-4 x Week",
    "Reps": "8-20",
    "RIR": "0-2"
  },
  {
    "Muscle": "Calves",
    'MV': "0-6",
    'MEV': "8-12",
    'MAV': "12-16",
    'MRV': "20+",
    "Freq": "2-4 x Week",
    "Reps": "8-20",
    "RIR": "0-2"
  },
  {
    "Muscle": "Abs",
    'MV': "0",
    'MEV': "1-15",
    'MAV': "16-20",
    'MRV': "25+",
    "Freq": "2-6 x Week",
    "Reps": "8-20",
    "RIR": "0-2"
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
   * @ignore 
   */
  constructor(public dialog: MatDialog, public router: Router) { }

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
    let muscleName: string = "";
    if (muscleGroup) {
      muscleName = muscleGroup.Muscle
    }
    const fullRoutePath: string = (origin + "/#/" + muscleName);
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
    this.selectedMuscleGroup = muscleGroup;
    this.dataSource = [muscleGroup];
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

}
