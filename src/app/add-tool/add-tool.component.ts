import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolService } from '../_services/tool.service';

@Component({
  selector: 'app-add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.css'],
})
export class AddToolComponent implements OnInit {
  content: string;

  constructor(private route: Router, private toolService: ToolService) {}

  ngOnInit(): void {}

  addTool(value: any) {
    this.toolService.addTool(value);
  }
}
