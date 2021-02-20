import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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
}

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
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ["Muscle", 'MV', 'MEV', 'MAV', 'MRV', "Freq", "Reps", "RIR"];
  dataSource: VolumeLandmark[] = VOLUME_LANDMARKS;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openShareDialog() {
    const dialogRef = this.dialog.open(ShareDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
