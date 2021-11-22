import TdxArgument from './interface/TdxArgument'
import { TdxFilter, TdxStatements } from './filterDSL'

export default abstract class RequestBuilder {
  /* TODO:
     1. make arg private
     2. expose arg value with public/protected methods
  */
  protected arg: TdxArgument = {}

  // TODO: extract city related logic to another class, and use Mixin pattern to inject DataFetchers
  protected city: string | undefined = undefined;

  private className: string | undefined = undefined;

  private keyword: string | undefined = undefined;

  private subset: string[] = [];

  protected filter: TdxFilter;

  protected abstract KEY_FOR_ID: string;

  protected abstract FIELDS_FOR_KEYWORD: string[];

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {
    this.filter = new TdxFilter()
  }

  // TODO: this builder is not able to collaberate with withKeyword, withClassName
  public withSubset(subset: string[]) :RequestBuilder {
    this.filter.regist(TdxStatements.filterIdSubset(subset, this.KEY_FOR_ID))
    return this
  }

  public withArg(arg: TdxArgument): RequestBuilder {
    this.arg = { ...arg }
    return this
  }

  public withCity(city: string): RequestBuilder {
    this.city = city
    return this
  }

  public withKeyword(keyword: string): RequestBuilder {
    this.filter.regist(TdxStatements.filterKeyword(keyword, this.FIELDS_FOR_KEYWORD))
    return this
  }

  public withClassName(className: string): RequestBuilder {
    this.filter.regist(TdxStatements.filterClassName(className))
    return this
  }

  public abstract invoke(): Promise<any>
}
