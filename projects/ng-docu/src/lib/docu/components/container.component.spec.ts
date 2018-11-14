import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { SectionComponent } from './section.component';
import { CodeComponent } from './code.component';
import { TextComponent } from './text.component';
import { TitleComponent } from './title.component';
import { SyntaxPipe } from '../pipes/syntax.pipe';
import { TextPipe } from '../pipes/text.pipe';
import { UpdateMetaService } from '../services/update-meta.service';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        SectionComponent,
        CodeComponent,
        TextComponent,
        TitleComponent,
        SyntaxPipe,
        TextPipe
      ],
      providers: [
        UpdateMetaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
