import { Timestamp } from '@angular/fire/firestore';
import { FormatDatePipe } from './format-date.pipe';
import { formatDate } from '@angular/common';

describe('FormatDatePipe', () => {

  let pipe: FormatDatePipe;

  beforeEach(() => {
    // Assuming 'en-US' as the default locale for these tests
    pipe = new FormatDatePipe('en-US');
  });


  it('create an instance', () => {
    const pipe = new FormatDatePipe('01.01.2001');
    expect(pipe).toBeTruthy();
  });

  it('should transform a valid Timestamp to a formatted date string', () => {
    const date = new Date(2022, 0, 15); 
    const timestamp = Timestamp.fromDate(date);

    const formattedDate = pipe.transform(timestamp);
    const expectedDate = formatDate(date, 'MMM-yyyy', 'en-US');

    expect(formattedDate).toBe(expectedDate);
  });

  it('should return an empty string for an invalid Timestamp', () => {
    const invalidTimestamp: any = null; 

    const result = pipe.transform(invalidTimestamp);

    expect(result).toBe('');
  });

  it('should transform a Timestamp with a custom format', () => {
    const date = new Date(2022, 5, 20); 
    const timestamp = Timestamp.fromDate(date);

    const formattedDate = pipe.transform(timestamp, 'dd-MM-yyyy');
    const expectedDate = formatDate(date, 'dd-MM-yyyy', 'en-US');

    expect(formattedDate).toBe(expectedDate);
  });

  it('should default to "MMM-yyyy" format if no format is provided', () => {
    const date = new Date(2022, 7, 25); 
    const timestamp = Timestamp.fromDate(date);

    const formattedDate = pipe.transform(timestamp);
    const expectedDate = formatDate(date, 'MMM-yyyy', 'en-US');

    expect(formattedDate).toBe(expectedDate);
  });

  

  it('should handle a Timestamp with missing toDate method', () => {
    const invalidTimestamp = { seconds: 1620302745, nanoseconds: 0 } as any; 

    const result = pipe.transform(invalidTimestamp);

    expect(result).toBe('');
  });

});
