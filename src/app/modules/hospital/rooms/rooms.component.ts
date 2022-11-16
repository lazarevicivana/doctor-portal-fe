import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Room } from 'src/app/modules/hospital/model/room.model';
import { RoomService } from 'src/app/modules/hospital/services/HospitalMapServices/room.service';
import { fabric } from 'fabric';
import { Group, Rect } from 'fabric/fabric-impl';
import {FormControl} from '@angular/forms';
import {Building} from "../model/building.model";
import { Floor } from '../model/floor.model';
import { BuildingService } from '../services/HospitalMapServices/building.service';
import { FloorService } from '../services/HospitalMapServices/floor.service';
import { GroomService } from '../services/HospitalMapServices/groom.service';
import { GRoom } from '../model/groom.model';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  //SELECTED
  public selectedBuilding: Building = new Building();
  public selectedFloor: Floor = new Floor();
  public selectedRoom: Room = new Room();

  //CONSTS
  floorLenght = 20;
  floorWidth = 15;
  squareSize= 30;

  //ALL DATA
  public allBuildings: Building[] = [];
  public allFloors: Floor[] = [];
  public allRooms: Room[] = [];
  public allGRooms: GRoom[] = [];

  //FOR VISUALISATION, FABRIC.JS
  public allRoomsGroups: Group[] = [];
  public allSquares: Rect[] = [];
  public allGreenSquares: Rect[]  =[];
  canvas: any;

  //NZM STA JE OVO NI DA LI TREBA
  public dataSource = new MatTableDataSource<Room>(); 
  public displayedColumns = ['number', 'floor', 'update', 'delete'];

  //LOADING
  buildingsLoaded:boolean = false;
  floorsLoaded:boolean = false;
  roomsLoaded:boolean = false;
  groomsLoaded:boolean = false;

  constructor(private roomService: RoomService, private buildingService: BuildingService, private groomService: GroomService, private floorService: FloorService,  private router: Router) { }

  ngOnInit(): void {
    this.setInitialSquares();

    this.buildingService.getBuildings().subscribe(res =>{
      this.allBuildings = res;
      console.log("Buildings: " + this.allBuildings[0].name);
      this.buildingsLoaded = true;
      this.checkIfAllLoaded();
    })

    this.floorService.getFloors().subscribe(res =>{
      this.allFloors = res;
      console.log("Floors: " + res[0].name);
      this.floorsLoaded = true;
      this.checkIfAllLoaded();
    })

    this.groomService.getGRooms().subscribe(res =>{
      this.allGRooms = res;
      console.log("Grooms: " + res);
      this.groomsLoaded = true;
      this.checkIfAllLoaded();
    })

    this.roomService.getRooms().subscribe(res => {
      this.allRooms = res;
      console.log("Rooms: " + this.allRooms);
      this.dataSource.data = this.allRooms; //NZM STA JE OVO
      this.roomsLoaded = true;
      this.checkIfAllLoaded();
    })
    
  }

  private checkIfAllLoaded(): void
  {
    if (this.roomsLoaded && this.groomsLoaded && this.buildingsLoaded && this.floorsLoaded)
    {
      this.loadEverything();
    }
  }

  private loadEverything()
  {
    this.loadGroomsToRooms(this.allGRooms);
    this.loadRoomsToFloors(this.allRooms);
    this.loadFloorsToBuildings(this.allFloors);
  }

  public updateRoom(room: Room) {
    this.roomService.updateRoom(room);
  }

  private setInitialSquares(): void
  {
    this.canvas = new fabric.Canvas('c');

    this.canvas.setHeight(screen.height);

    this.canvas.setWidth(screen.width/2);

    for(let l = 0; l < this.floorLenght; l++)
    {
      for(let w =0; w < this.floorWidth;w++)
      {
        let square = new fabric.Rect({

          left: l * this.squareSize,
          top: w * this.squareSize,
          fill: 'white',
          width: this.squareSize,
          height: this.squareSize,
          strokeWidth: 5,
          stroke: "black",
        });

        square.hoverCursor = "alias";
        square.hasControls = false;
        square.hasBorders = false;
        square.lockMovementX = true;
        square.lockMovementY = true;

        square.toObject.prototype.id = "ROOM"+l+"-"+w;
        square.toObject.prototype.posX = w;
        square.toObject.prototype.posY = l;

        this.allSquares.push(square);
        square.on('mousedblclick',function()
        {
          console.log("Clicked on: X: " + l + " Y: " + w);
        });
        this.canvas.add(square);

      }
    }

    this.canvas.renderAll();
  }

  private loadRoomsToFloors(roomsForLoad:Room[]):void
  {
    roomsForLoad.forEach(room => 
    {
      this.allFloors.forEach(floor => 
      {
        if(floor.id == room.floorId)
        {
          if(floor.Rooms == null)
          {
            floor.Rooms = [];
          }
            floor.Rooms.push(room);
          
        }
      })
    })
  }

  private loadFloorsToBuildings(floorsForLoad:Floor[]):void
  {
    floorsForLoad.forEach(floor => 
    {
      this.allBuildings.forEach(building => 
      {
        if(building.floors == null)
        {
          building.floors = [];
        }
        if(building.id == floor.buildingId)
        {
          building.floors?.push(floor);
        }
      })
    })
  }

  private loadGroomsToRooms(groomsForLoad:GRoom[]):void
  {
    groomsForLoad.forEach(groom => 
    {
      this.allRooms.forEach(room => 
      {
        if(room.id == groom.roomId)
        {
          room.groom = groom;
        }
      })
    })
  }


  public clearRooms(resetFloor=false):void
  {
    console.log("rooms: " + this.selectedRoom.name + " buildings: " + this.selectedBuilding.name + " floor: " + this.selectedFloor.name);
    this.selectedRoom = new Room();

    if(resetFloor)
    {
      this.selectedFloor = new Floor();
    }

    this.deleteOldRooms();
  }

  public deleteOldRooms():void
  {
    this.allRoomsGroups.forEach(group =>
    {
      group.forEachObject(obj=>
      {
        this.canvas.remove(obj)
      })

      this.canvas.remove(group);
    });

    this.allRoomsGroups=[];

  }

  public reloadRooms():void
  {
    this.clearRooms();

    //Load newRooms
    this.selectedFloor.Rooms.forEach(room => 
    {

      console.log("RELOADUJEM");

      //SQUARE
      let square = new fabric.Rect(
      {
        left: room.groom.positionX * this.squareSize,
        top: room.groom.positionY * this.squareSize,
        fill: 'red',
        width: this.squareSize * room.groom.width,
        height: this.squareSize * room.groom.lenght,
        strokeWidth: 5,
        stroke: "black",
      });

       this.canvas.add(square);

      //TEXT
      let text = new fabric.Text(room.name, 
      {
        left: room.groom.positionX * this.squareSize + (this.squareSize * room.groom.width) / 4,
        top: room.groom.positionY * this.squareSize + (this.squareSize * room.groom.lenght) / 4,
        textAlign: 'center'
      });

      this.canvas.add(text);

      //GROUP
      let group = new fabric.Group([square, text], {});

      group.hoverCursor = "alias";
      group.hasControls = false;
      group.hasBorders = false;
      group.lockMovementX = true;
      group.lockMovementY = true;
      group.name = room.id;
      group.on('mousedblclick', () => 
      {
          this.selectRoom(room);
          console.log("Clicked on room: " + room.name);
      });

      this.canvas.add(group);
      this.allRoomsGroups.push(group);
    });

    this.canvas.renderAll();
  }

  
  public selectRoom(roomToSelect: Room):void
  {
    
    let allRoomsGroupsTemp: fabric.Group[] = [];
    
    //Load newRooms
    this.allRoomsGroups.forEach(group => 
    {
      let groupTemp = group;

      if(groupTemp.name == roomToSelect.id)
      {
        groupTemp.item(0).set('fill','green');
      }
      else
      {
        groupTemp.item(0).set('fill','red');
      }

      allRoomsGroupsTemp.push(groupTemp);
    });
    
      this.clearRooms();

      this.allRoomsGroups = allRoomsGroupsTemp;
      
      this.allRoomsGroups.forEach(element => {
        this.canvas.add(element);
      });

    this.canvas.renderAll();
  }
  
}
