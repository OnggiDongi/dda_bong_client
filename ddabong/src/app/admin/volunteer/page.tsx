import ActivityReview from '@/components/ActivityReview';
import ActivityApplyInfo from '@/components/admin/volunteer/ActivityApplyInfo';
import TopBar from '@/components/atoms/TopBar';

const userProfileImage =
  'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-08-29+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+9.58.48.png';
const reviews = [
  {
    userName: '초수비',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/초수비.jpg',
    totalRate: 4.0,
    diligenceLevel: 4.0,
    attitude: 4.0,
    healthStatus: 4.0,
    status: 'PENDING',
    aiReview: '피그마를 잘해요. 마라샹궈를 좋아해요.',
  },
  {
    userName: '김보개미',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/김보개미.png',
    totalRate: 1.2,
    diligenceLevel: 1.0,
    attitude: 1.0,
    healthStatus: 1.0,
    status: 'REJECTED',
    aiReview: '다리가 불편해보여요. 정신 사나워요.',
  },
  {
    userName: '이짐',
    imageUrl: userProfileImage,
    totalRate: 4.5,
    diligenceLevel: 4.0,
    attitude: 5.0,
    healthStatus: 5.0,
    status: 'APPROVED',
    aiReview: '짐이 많아요. 우산 키링을 좋아해요.',
  },
  {
    userName: '기여니피그',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/김태희.png',
    totalRate: 5.0,
    diligenceLevel: 5.0,
    attitude: 5.0,
    healthStatus: 5.0,
    status: 'PENDING',
    aiReview: '외계어를 해요. 4차원이에요.',
  },
  {
    userName: '비버',
    imageUrl:
      'https://ddabong-upload.s3.ap-northeast-2.amazonaws.com/uploads/비버.png',
    totalRate: 4.9,
    diligenceLevel: 5.0,
    attitude: 5.0,
    healthStatus: 4.7,
    status: 'PENDING',
    aiReview: '밥을 많이 안주면 물어요. 소리를 질러..',
  },
];

export default function VolunteerListPage() {
  return (
    <>
      <div className='flex flex-col'>
        <TopBar title='지원자 목록'></TopBar>
        <ActivityApplyInfo
          title='미녀들이랑 노는 봉사'
          endDate='2025.09.01'
          category='농어촌'
          imageUrl='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIVFhUXFxUYFhcYFhYXFxcXGBUWFxUYFxUYHSggGBolHRUVITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGBAQFy0dHR0tLS0tKy0tLS0tLS0rKy0tLS0tKy0tLS0rKy0tLSstLS0tKy0rLS0tLS0tLS0rLSsvK//AABEIAQMAwgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAECBAYFBwj/xAA8EAABAwICBwYFBAIBAwUAAAABAAIRAyEEMQUSQVFhcfAGIoGRobETMsHR4QcjQvFScmIkgsIUU6Kyw//EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACURAQACAgIBAwQDAAAAAAAAAAABAgMRITESIkFRBBMycUJhgf/aAAwDAQACEQMRAD8AtPUXDb111sUqnXXXuh8FZVEobgnIumqIIgSOuuhxQwFJgQ3G6BPaoxa3XX23qVQ/ZQp5QgYNUC2U4ddQrvQQqKAafNSqVLIbakCPJSDULSpVoMTwQKD7mclN758roBVLKLxayqaR0kyl8xvFhtPgs9i+0bzamA0bzc/ZBp6hAEzYC5OxcjE6epNENJeeAt5lZ2vj6tQQ55I3WA9Aq0oloWdohkWf/L8K/Q0gxwADr7j1Cx4rRsCt0XAiR5cVA1z2kAKNWbA+C5mi9IlzNR2Y27Y2LpVK0gb0QeoXaw32UDWdrTG+VKpWuCNnRTGsA+YsUFfWSUSkg9CqFQBm/XXWxSqoYCkRc+CmeAoubJTVMlAZhmeuutyg6Bfr8KVJsXKG9snggdzR1114IYA6668kSrEWz3qFMAZ3QDMDxQqoi+7rNSLZOaFXMoB1jInrrrchMII4jNKqCAgapEnzUixShc7TulxTaA27zMcLm5U8XidRhduy+gXHwOiX1yajwSSckmdJiNuHVqOeS5xJJzJUCFsqvZ1wE6jjOwDyuq9Ts+6Pkg7dZU8oX8JZWFEhd+roprMzz4qhiqE5Dx2ee1W2jTmuapUKmrO76qRCbVlSqt4WuGvBG8A+P9rUfEBa07VjKbY81rqQEAqCVio8SCokt1o37dyT2CRuUTTE/REK5ISSLUkHodS3XXXNBYZt11+ERwUNWOuuuakCqv8ANSDrSPHrr1UXN2pE7OuvzuUCDKkmCE9etFoHj9VECAphmuQczkgdoMa4aYGZi2+OuKrtdrOPdzuICtue4TTNmmDBHlH4UarH0xA2QSRxy4+CCniKmQgSPqq1cQCrz6dhUtcxxneqNZs5oKofLYOY6lAp1YJBuMxzVjVBEhAawGRCkQw2A/8AUVW09mbt0Bei6N0RTYAGtsFm+xuFGs9/ED6n3W9otWGSeXXgrxtBuDG5KrgWmxA8ldYEQsWToZLSfZ6m4TqD0lYzTOhdQHukjdYesL1OuuLpfR7ajTIVotpS9ImHh+Lwpki3HgFzzYrcdotHBkhrfDf47liMSb9enBdNZ24rRoxNzyWkwbiWt5D8rNU9vIrvaPqdxoUqumWm3komZTOqG3XimFQ60woQGWplMs4HzSQegVHdddZ70Bj4PBGPXXWcbCh2yUgNd3qkDaCnq2zTC4kePXW3ggA1xmeijvEiWjPPcmLhMJNqlhvcfTrrJQDU5iCTLR3R+Tkg0NY61RxIBOqd5z2dZninc/X77bbCJEzwHsh1ap1tR0eH+Wzx2KALENc5wYMs54bzuVXEvOxWcY8saJIzt/l+B+VXrkQHZSNv069lIpNkTuKCAZnrrNEZVznw+yGKt42FBp+xuMptljntDtaYJjct5QIzXl+jamEc0NqmmKhJ1STqu4X2raaEq6gFMmf8Vhk7duH8XfqYpjLucAOJhQGlqRyqNPIyuRpbDNfGsJhcZmPwdGoGOdTa/cc1nDaWifpSi4wKjZ5x7pnuVAV8LUu0Unf6hqtUWNA7oAHBBie3NGGyOvBeVVjJXsfbS7B4rgdkuyTKrxUqgPBkimcjG153cNq2reKxuXPkxza2oefYXPwXW0dUhvitD290VSpalSlTZTJc5jmsbqgxBDtUZHMcZCzWCEStK28uWGSk0nUus+plGaXxb5W3KBcIBTkiY37VLM/xEkvhhJEt+SYjrb+fVVwCTKsTN/PrrYMgUGpVv7qUB15UWAhFqW666neh03zYqAIMMpqrZCnUqwfv91N7hGtEb+fXWaCqCWjMqLmwZDhJ3WP4KcVZknLkqdapeyCdRoNy4+O1DqMkeCbEVZ2ddeyHrkNhBE0gcv6VdgExt2fVS1iJI3IOoTl4fdSOq3swcThwWwJcZMCRERzGfmtro/BvaWS0Nb+21oBM90EOcZGZEKh2HxHcc05zPnmtU272zsk/T6rC886duKseMTCdeg18jh6rC1uyFRmJpVwSCxwcXNN33JuT8ucW2bluqNYB98leBByWVba6b2rE8SzNXs58ep8erTpg7e42TzdmVergMbqgRC7FaqQ2FnNI1M03tascMv2vdrU4GaLoDDNpxruN2CG7Q7OBG3K/3Q9IxIDjAJHhfgrenNN4TD4cPD2PJMsAILqhaQLRnGXBTPtCnG5syX6l4sHEU6YPys1jzfA//P1WUw2ZUMZjH1qrqr7ucZMZDYGjgBAT0B3jyXRSNREOHJbytMusALJyLwhsbYKRbdWZGMJKBCZEvRiwgddf0g/CM365qxTqA2OzrrkNyrVXdfRSg9Rs2nrrqxUQ2B15pOqW9+vLolQpuMyoEoBM5JOtLSLHoHn1tCFWdNgM0Wk8xqxJvq80AXCRAOSo1iBs23UcWHzZwadoMg8kBpcSWuuRkd/JNp0NW39ddb0NjgRxHqlVpnrrJMKVpRAHxIcQflO3cVCiJdIyHsn+GC4jbsG9Hw1ONttvsOakd3QOLDKzY+Vwj+/Gy2OJquaQ9kG0EH0I8153UquZA4yb8itCNK1DSa9haYI1gTfOyyy13y6fp7/xaSlTquElrb8bjmutS7ogrJYfT1YX+ESObR6yutg9KmpM03MjaYIPiCuea6d9qzHbo4qquDj3LpYirAWY0riy46jLuPpxKQpM8M92gx8a7hkxjj4xA9ysHi9Ia9KhTggUmuHAl7pJ5mOszsO1lH4eGcIdJI1jHETdYBxyK6cfThyzysU3Znrej0HX5j7rniorGEf3vAK7J22kkAJ3ST1sUKbpA3p3EyCiqJaUlF0pIPR9QR11/XEIToFyo0nkIdV8nry5KQepv2dfnyPBDDxlkogkCOupHpwUAwqARxIt111tTmHCRmOvt6ITgTmV3NC4Ihmsba3mW7huUWnULUr5TpkK1Bw1S8zM88znxQMQYe0cCtb2koj4Wt3u78sgGZMET91ksX8odF236KrWdr3r48DVKpi+e/eh03EA7ijFwc0OGVrddeqHTeMj5q7JUAJdyVug0mTN7+JVRlSHSFdLZADcyc5yhSE1kxJvMj7K1gsRq1SIGqQQ4f5DaRyzVKtXi44Dz29bk2EqONRjTGqAY8RF/NJTE65egYbR9MgOEkG4MrqMaGttkFgdD46q12q1/dkWzFzAiclqqbXvs5xjdkPRct66l30y+cco4yq6qdVmW12wct5U8JgGsFrk5k5lX6VCAiGnZZTLViO2eE16L28D7Lx4Fe/6TwetY7bDidw3leWdtOz7KDWVKQiQddkzAmzzFhe2ftfpxdOLPrbJqxhfmHW9VgrGE+cLVi72HdZRc+9vL3T4c93mo1HCUQRJSR24lkZeySDeUnC4ytz6/EbUOuNW359fr47UNjST68oE+SVUSeuhl1CITY4OF7EddfkoIfBnr1zUvh2nrrPyPBDgTdB0tF06b397mG7CZFuQ3cty0zmhrZdfgFiX90624gg+0dfVa/RWKGIombOgh0Wgws8m9bdGCa71LhaQ0vTrUXjVcwzIMWMOEExlPFUMboyaD6sEQ1xExkAQQfGVYx2DAp/DbmYEyJix+ir6RGphniZ7sTwsI9lWk8Jy8z/jh4Zh+G08PupNZIKHha0Uxytw8UzXm5Gez6LZzAgaru95+0o2vqmBz9FXqUyTzgeJRquELADrSTsj6qROu8GD0FZwTRUEa0OJAkZ3tI439VdwmgyQC+b7NvirrtGso03VNQuiIAEkkkNbyuQJ4qnnC8Y5AwWGaxx787Bs+UiJ2TabnZxWqwGKb/KxtOy/jkVycHgyGgvjWNyNnIcF0sLhKgYNR8THzND4ETmYMawb0FSfG3fDWsWp1y6TdJUtjg6090OfbIHug2m0709fEOvDAwBrnF1QgQBYEMBOu0um8izTvQKFDEPMvruAJDu41jYOToOcG+7fmi09DU5moDUvMVHl0WjunYMzHEqNY4/tbeW3toKrWJ1vhMc94EGs7WhrbF+q0EEZfKPM3ngaa7PfGpPplxOtc1CP3C4gbTkJERkYWudFpMwIHLchVXtAJJsLk7lW2aZ4qtX6eI5tL510xoqphqhp1RG47HDeEDA/N4FelaUwT9LPJpjVwzCQx0DWqOFi4E5N91w6nYDFUnEtDajdkEB3kbeq2i3ywtSfbpzcNlKcNE8E9TDPpHVqNcxw2EQfDeoxGaszCdEpKLiEkHodOqQZ635p8Q9totv4bh1sA4yT4AJDdaN58d2/gh16UEiI4bI6i/Ef5AIgLD1iOI2jrLL0QqjpPNWKDAe7kbRfPhu6HFCrWtu66+8oBuJiOur+qu6AxjqNSf4mA4czY9b+Kq1Hgif5fXqT+DatSqwbePHwSSJ1O3SoVtYkxJOv5EEDyXJ0w5xbDnQ0vEjeRfxiF0sM46gGRAN+bpn1K42mCZbu1j4G11SO2kzwJT1YLcoExvEWI38kAGCLW27+CkynImeH4KiMyDn7lXZgYl3esd0eBzXY0JTNaprOHdYPAnr2XGxIg/TxyWw0ZSFGlLjFtZxOyVW06hekbl1qNLWMDM77AAXJJ2AC5KEz9y4M05llo1oBHxCNgMkNG6TttB7HOmiYhwaa4i4/kyhrTlk5/gLhdGlSVNabR6ksLhg67tivZWCVGlAVlrFnLeqNNts1JtBGbTRgFXS+wmUBuWY/UbEuZhDTptl9ctog7tdzR7aw5wtbKz+nmipXoUz/AO41/iyXD1aFNI5UyT6dLmjsA2hRZSA+RrW+QzRfhgo9ZKkxQso4zRNKqNWpTa4biAfdZjS3YLDvBNMGm7ZBJHi07OULetZKjUoq8WmFZpE9w8SqdhsUCQPhkSYOsRPhq2SXsJpBJX+4z+xDz7EVpOXX0Un1nOaGu8N5iQBO7PoCIVrGM/eNnp6FHq6rgXtMAXI8hA8YHKD/ABM6uNRDTPXJRqtk3PipsxBa6bHeDcEbvJRxVVpPdH97euZ2oFUo2BixFj6fj+wg0iOUgwdkqVOq4NI2HPrkq4YSetiDtP8A4kQO7SB2ZscT7Lh6Wg09YZh0+sfX0XbDS94sbtpx4630XJxbIpEnJwcfImPZU92nspUcQcwJtlsKFc9eqJgHAtAdadvnYpnug28OKuzW9BYEVK7Q8iBe5HejIDf+F0dJ6TL6zaVIAw4G+RcCIkbQPfkuL2wwAp0sK4iC6oS7hZpj0V7srSnEn/iCfMkD2KpPy1iNelt8BhYETO0k5ucbuJ4kyupRopYSlZXWshZTLoiAxTUwE7k7AoWTY1EaEmNRQFVZGFgmaR+PpQMblTaTPE265rWaaxRDTTYRruBiXBuQJNyc7LEfp3gH/GrV6n8oDTvm5z2ZLSI1WZZWnd4rDfkJJFOsdt9CU3ojnWVcBEKnYrkJKaSlLzCtUc4kmZJJJ4k3UnUSAOIkDgfvI8xvRcaGggAzaSRbPIRyg8JjYSYUsX3YcNYAWnfePC5ngSOXW8sClSGtcxO/Lx4cVLEYct+YR5X8rdcQgVHz9Uqr3EAE2GXDf1wQGouY4arjqkTfYRmZ4++WwKmakGRY7EVlA6utneOI4kdZFBkA35+CDuvf3gcppsjmAWfdUNJNBbqcLeJRviAhl5hjRyzQsVVkg8vQlZtYcOlSgvZtaTbeNh8l0+zujvi1hPytuf8AxBTdo8IadUVRYOsTuP8AErrU8R/6LBVK7h3yJAO17u6wcsvIq3luCKatz7M7+qGPa+rToNMmkHF97az9WBzAE/8Acrf6Z1/iVKpdGtDBbaBN7nOZlYGrVc9xc4lznElxOZJuSVb0RpSphqgq0iARYg3DhtBG5TNfTpHn6tvojDtVoNssJ2f/AFIwlSG1iaD9uvemTtioMh/sAtdQ0rQqtLqVanUAz1Htd/8AUrnmsw6a2iek6rrotFUm1M3OIA4mFx9K9vMDhpBrCo8fwpd8zuLh3W+JCak8ojtrgubpHTTKctaWl20lwaxvF7zZoXlGmf1QxFUkUqbabJtJJdGyYtPoslpLTNSsZebTIaSS0H/i3JvgtK4vlnbN8Np2i0o91So6s4BrIggh7SSJbBaSDOxavsNp/D1KDGis34oB1mOMPEGBY5iIykLxGtWc4AEmBcDYDAExvgZoUK9qeUaZ0yTWdvptuJY4wHtJ3BwJ8lM1AvnzsdjPg4ug4QP3GtOyzjqm/wD3L2zEYk67QNp/tcuSnjMOzFk84l3GqaBRKMVELopJklI8uqU+vL7jzG9Ep0w4d25vI+3v57ghYnFyAAMrniePDPxc7ehU3HMWXY8tKr3DG4+oz5qVeqwtkCHHOPljhu/PAIDm3UqtH+9kb+XXMA0KzmulqHUJcb7TJ5lGpObk4ZxB2j8IGKgGAZ2T7oLlGfli8R5QiYhliDns8kLRlQueJvAcAfCfurWJBMncW/UKnu1jrbvY/CB9MawkENd7FZH9UtIXpYZuwfEdzMtZ/wCfot5iL02xta2PILybt9WLsfWB/jqNHhTafdxWePt0ZuK/tnwolSKZdDjMU4MGRY79vmkk5SFUdOd+d/dRCSSaCTFOkmhElRJTkJjKgOxxBBBgggjgRkvauz2khifg1f8AJskbnZOHnK8TlbP9N9JubiBRJ7rpc3g4C8cx7LPLTcNsN/Gf29spFEJVWg9Hlc+nbBpSTJKNJeZ1KVpMCBY79wA6iDuuGnVixuDu+nX1TvmLZbPueKHSpTtG+N67HlGxNUEwBbIcePX0UPiHVjZ19vRPWZHrA+vLrYkxzTc2IHnu68UEKdMmeUwg1Gp9e9s02JeSZO5B0NFOZrhwP8SIPL+1aqVczvLVycC39xk7T6Qug5utbiPdVleJ4avBu1qVHkzyH9Lyrt5TjSFfiWEcjSZ9ivUtEVP2aZP+DfZed/qXS/6llQfzpwebCfo4eSzx/k6c34MkUySUrdyHCRTSnKkRSSSQMkUkxQJMkkgjC6XZuv8ADxVF85PA8+79Vzk7H6padzmnyIKiUw+kMG6QFbXN0S+WNPALoErkl6NejaySgSkoS82ZXEE7eVj1nH3Kpnh/asilYTtyjrrxCC4wTtF+S63lo1nk3OfuOChqWU65ECDact3XWZQ6TiMkEJg3EhLFOAFr/RJrJOajUZvQSwtSCBs9ty6mJdAnd9lx2xttG7aiaWxE0QQbnVHl+FErVlqaekWUqDNdwENHssH2lxpxPeaO62SN53qNNoIk3PFGeyMx9lEViJWvlm0aZiFFHxNPVcW8bctiCVooaU8pkyB5TSkmQSlRlIlMgSSZJQHQa5RwUGqEgfROgXfts5D2XWIXD7Numiz/AFHsu2SuS3b0adBykoFJQs8za4iUMN4ogcDbJDqGfp4LreWYthMIyPMFO55iFCNqCNV9/wAbE1VxIvlsSKZ7gROR+iAYZItdCxAmxEjq/NFDiDIsoE+qALwAABkmvESjvpxnZDc6RMXQcXTFOC128EeR/K566emBZvM+y5alJimTpipCKaUimQMSmlJJAkkk6BpQybIj0PZfaCkIl772Xd+zT/1b7BaAGyzXZ90U2f6j2WhYbLkt29KnSJKSchJVWeavA690Jx62pxINkzxfrwXW8s1jfbuQJvPqjOaoEwUEXDeo6m3ZvU3+iGLWQRJEwclGpHPqymQhVLc0EWO33UDcTOWxSc6UMhBzNM5N3SfOFyl1tLu7rRx+i5SmCDFMU6YqUopJJIGTKSZQGSSSUhnqb6IPAqJCK91pUD2PQlb9qkf+LfYLVYcyFhOyri/C0Tthvot1hGmFy3ehjncJFJRISVGrzYC5RAJgcQkku15Kq1xEjZJChOfIJJKA4yUaeXKUkkATkfBDcLDxSSQRcIQQc0kkHJ0ofl8foueUklZMGTFJJAySSSBimSSUBJikkgdqHUPXmkkg9c7Bj/paH+v3W+oCySS5r9u/D0E5JJJUav/Z'
          recruitNum={10}
          applicantsNum={8}
        />
        <div>
          {reviews.map((user) => (
            <ActivityReview
              key={user.userName}
              userName={user.userName}
              imageUrl={user.imageUrl}
              totalRate={user.totalRate}
              diligenceLevel={user.diligenceLevel}
              attitude={user.attitude}
              healthStatus={user.healthStatus}
              status={user.status}
              aiReview={user.aiReview}
            />
          ))}
        </div>
      </div>
    </>
  );
}
