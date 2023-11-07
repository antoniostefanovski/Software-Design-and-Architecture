namespace WineriesApp.Services.Filters
{
    public interface IFilter<T>
    {
        T Execute(T input);
    }
}

/*
 
Filtri:
- filter trganje na null vrednosti // done ---> URL mesto ova! || DONE
- coordinates filter  // done
- phone-format filter (imame telefon koj e vo specificen format, treba da go donesime vo tipot +389 7* *** ***)

Konvertiranje string -> object
Populate from row so string


["Zaharchev Winery and Distillery",
41.436183508157946,22.0049983432303,
"Kosovska 16, Kavadarci 1430",
070253103,
5.0,
null(strana),
null]

 */